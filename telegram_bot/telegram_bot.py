import json
from typing import Any, Dict

import requests
import telebot
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup
from telegram_bot_calendar import LSTEP, DetailedTelegramCalendar

from defs import Defs, Stage, StageGroup, StageType, Value

# t.me/CalcMiluim_bot

BOT_TOKEN = "6346223964:AAGoCkra0oNHXwWRphjqVvhsfEM6ickBtbY"  # Replace with your actual bot token
API_ENDPOINT = "https://api.calculate-miluim.info/benefits/benefits"

bot = telebot.TeleBot(BOT_TOKEN)


with open("defs.json", 'r') as f:
    defs_dict = json.load(f)
definitions = Defs.model_validate(defs_dict)



class NoMoreStages(Exception):
    pass


class PromptToRepeat(Exception):
    pass


class Session:
    
    def __init__(self) -> None:
        self._responses = {}
        self._stage_group_index: int = 0
        self._group_loop_index: int = 0
        self._stage_index: int = 0
        self._update_stage()
        
    def _update_stage(self):
        self._stage_group: StageGroup = definitions.stage_groups[self._stage_group_index]
        self._stage: Stage = self._stage_group.stages[self._stage_index]
    
    def next_stage(self):
        self._stage_index += 1
        if self._stage_index == len(self._stage_group.stages):
            # Finished all stages for current group
            
            self._group_loop_index += 1
            if self._stage_group.repeats and self._group_loop_index < self._stage_group.max_repeats:
                # Try to start a new loop, unless the user declines
                self._stage_index = 0
                self._update_stage()
                raise PromptToRepeat()
                
            # No repetition, go to next group
            self._next_group()
        
        self._update_stage()


    def _next_group(self):
        self._stage_group_index += 1
        self._group_loop_index = 0
        self._stage_index = 0
    
        if self._stage_group_index == len(definitions.stage_groups):
            # No more groups, we are done
            raise NoMoreStages()

        self._update_stage()
        

    def abort_repeat(self):
        self._next_group()


    @property
    def stage(self) -> Stage:
        return self._stage

    @property
    def responses(self) -> Dict[str, Any]:
        return self._responses


    def _stage_api_key(self, stage_group: StageGroup = None, stage: Stage = None) -> str:
        if not stage_group:
            stage_group = self._stage_group
        if not stage:
            stage = self._stage
            
        stage_key_parts = [part for part in [stage_group.api_key, stage.api_key] if part]
        stage_key = '.'.join(stage_key_parts)
        return stage_key


    def set_response(self, val: Any):
        stage_key = self._stage_api_key()
            
        if self._stage_group.repeats:
            if stage_key not in self.responses:
                self.responses[stage_key] = []
            self.responses[stage_key].append(val)
        else:
            self.responses[stage_key] = val
        
    def should_show_stage(self):
        if self.stage.condition is None:
            return True
        
        if self._stage_group.repeats:
            # We assume in this case, the referenced question is in the same group
            ref_val = self.responses[self.stage.condition.ref][self._group_loop_index]
        else:
            ref_val = self.responses.get(self.stage.condition.ref)

        return self.stage.condition.equals == ref_val

    def get_repeat_prompt(self):
        return self._stage_group.repeat_prompt
    
    
    def _set_dict_val(self, d: dict, k: str, v: Any):
        # Create a hierarchy of objects by treating dots in the key as separate levels
        key_parts = k.split('.')
        curr_dict = d
        for part in key_parts[:-1]:
            if part not in curr_dict:
                curr_dict[part] = {}
            curr_dict = curr_dict[part]
        curr_dict[key_parts[-1]] = v
    
    
    @property
    def responses_dict(self) -> dict:
        responses_dict = {}
        
        for stage_group in definitions.stage_groups:
            if stage_group.repeats:
                assert stage_group.api_key  # A group that repeats must have a key that holds the list
                loops = []
                num_of_loops = len(self.responses[self._stage_api_key(stage_group, stage_group.stages[0])])
                for i in range(num_of_loops):
                    current_loop = {
                        stage.api_key: self.responses[self._stage_api_key(stage_group, stage)][i]
                        for stage in stage_group.stages if not stage.exclude_from_api}
                    loops.append(current_loop)
            
                responses_dict[stage_group.api_key] = loops
                
            else:
                # No repetitions, so not a list
                if stage_group.api_key:
                    # A sub-object
                    responses_dict[stage_group.api_key] = {}
                    currr_dict = responses_dict[stage_group.api_key]
                else:
                    # Just 1st-level properties
                    currr_dict = responses_dict
                
                for stage in stage_group.stages:
                    if stage.exclude_from_api:
                        continue
                    self._set_dict_val(currr_dict, stage.api_key, self.responses[self._stage_api_key(stage_group, stage)])

        return responses_dict



conversation_state: Dict[str, Session] = {}





def present_choices(chat_id, choices: Value, prompt: str, callback_prefix: str = None):
    MAX_CHARS_PER_LINE = 30
    
    if not callback_prefix:
        callback_prefix = f"choice_{choices.type}_"
    
    current_line = []
    lines = [current_line]
    for choice in choices.options:
        choice_text = choice.text
        if current_line and (sum([len(item.text) for item in current_line]) + len(choice_text)) > MAX_CHARS_PER_LINE:
            # Start a new line
            current_line = []
            lines.append(current_line)
        current_line.append(choice)
    
    buttons = [
        [
            InlineKeyboardButton(text=choice.text, callback_data=f"{callback_prefix}{choice.name}")
            for choice in line
        ]
        for line in lines
    ]

    keyboard = InlineKeyboardMarkup(buttons)
    bot.send_message(chat_id, prompt, reply_markup=keyboard)


def choice_handler(chat_id, stage: Stage):
    present_choices(chat_id=chat_id, choices=definitions.value_from_name(stage.choices), prompt=stage.prompt)


@bot.callback_query_handler(func=lambda callback: callback.data.startswith('choice_'))
def choice_cb(callback):
    params = callback.data.split("_")
    assert len(params) == 3
    assert params[0] == "choice"
    
    enum_type_name = params[1]
    enum_val_name = params[2]
    
    choices_type = definitions.value_from_name(enum_type_name)
    option = choices_type.option_from_name(enum_val_name)

    val = option.val

    handle_user_response(callback.message.chat.id, val)


@bot.callback_query_handler(func=lambda callback: callback.data.startswith('repeat_'))
def repeat_cb(callback):
    params = callback.data.split("_")
    assert len(params) == 2
    assert params[0] == "repeat"
    
    enum_val_name = params[1]
    
    choices_type = definitions.value_from_name("YesNo")
    option = choices_type.option_from_name(enum_val_name)
    
    if option.val is False:
        # Need to abort
        session = conversation_state[callback.message.chat.id]
        session.abort_repeat()

    ask_question(callback.message.chat.id)


def yesno_handler(chat_id, stage: Stage):
    present_choices(chat_id=chat_id, choices=definitions.value_from_name("YesNo"), prompt=stage.prompt)



def date_handler(chat_id, stage: Stage):
    calendar, step = DetailedTelegramCalendar().build()
    bot.send_message(chat_id, stage.prompt, reply_markup=calendar)


@bot.callback_query_handler(func=DetailedTelegramCalendar.func())
def date_cb(callback):

    session = conversation_state[callback.message.chat.id]
    stage = session.stage
    
    result, key, step = DetailedTelegramCalendar().process(callback.data)
    if not result and key:
        bot.edit_message_text(stage.prompt,
                              callback.message.chat.id,
                              callback.message.message_id,
                              reply_markup=key)
    elif result:
        bot.edit_message_text(f"{result}",
                              callback.message.chat.id,
                              callback.message.message_id)
        
        handle_user_response(callback.message.chat.id, result.strftime(r"%Y-%m-%d"))


@bot.message_handler(commands=["start"])
def handle_conversation_start(message):
    chat_id = message.chat.id
    conversation_state[chat_id] = Session()
    ask_question(chat_id)


@bot.message_handler(func=lambda message: True)
def handle_user_message(message):
    chat_id = message.chat.id
    handle_user_response(chat_id, message.text)


def prompt_to_repeat_group(chat_id):
    session = conversation_state[chat_id]
    prompt = session.get_repeat_prompt()
    present_choices(chat_id=chat_id, choices=definitions.value_from_name("YesNo"), prompt=prompt, callback_prefix="repeat_")


def handle_user_response(chat_id, response):
    session = conversation_state[chat_id]
    session.set_response(val=response)
    
    try:
        session.next_stage()
    except PromptToRepeat:
        prompt_to_repeat_group(chat_id=chat_id)
        return
    except NoMoreStages:
        get_results(chat_id=chat_id)
        return
    
    # There are more stages
    ask_question(chat_id)


def ask_question(chat_id):
    session: Session = conversation_state[chat_id]
    stage: Stage = session.stage
    
    if not session.should_show_stage():
        handle_user_response(chat_id=chat_id, response=None)
        return

    question_handler = {
        StageType.CHOICE: choice_handler,
        StageType.DATE: date_handler,
        StageType.YESNO: yesno_handler,
    }[stage.answer_type]
    
    question_handler(chat_id, stage)



        

def get_results(chat_id):
    bot.send_message(chat_id, "Done!")

    session: Session = conversation_state[chat_id]
    responses_dict = session.responses_dict
    
    response = requests.post(url=API_ENDPOINT, json=responses_dict)
    print(response)
    
    del conversation_state[chat_id]



bot.polling()
