from collections import namedtuple
from datetime import date
from enum import Enum, auto
from typing import List, Tuple

import telebot
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup
from telegram_bot_calendar import LSTEP, DetailedTelegramCalendar

# t.me/CalcMiluim_bot

BOT_TOKEN = "6346223964:AAGoCkra0oNHXwWRphjqVvhsfEM6ickBtbY"  # Replace with your actual bot token

bot = telebot.TeleBot(BOT_TOKEN)

conversation_state = {}


class ServiceType(Enum):
    TZAV8 = 'צו 8'
    TAASUKA = 'תעסוקה מבצעית'
    OTHER = 'שמ"פ אחר'


class YesNo(Enum):
    YES = "כן"
    NO = 'לא'


class StageType(Enum):
    DATE = auto()
    CHOICE = auto()
    YESNO = auto()
    

    

Stage = namedtuple("Stage", ["key", "prompt", "answer_type", "args", "condition"])

DateStageArgs = namedtuple("DateStageArgs", ["min_date", "max_date"])


STAGES: List[Stage] = [
    Stage("recruitment_dates.start_date", "תחילת מילואים", StageType.DATE, DateStageArgs(date(2023, 10, 7), None), None),
    Stage("recruitment_dates.end_date", "סיום מילואים", StageType.DATE, DateStageArgs(date(2023, 10, 7), None), None),
    Stage("recruitment_dates.recruitment_type", "סוג המילואים", StageType.CHOICE, ServiceType, None),
    Stage("active_reservist", "האם בשירות מילואים פעיל?", StageType.YESNO, None, None),
    
    Stage("family_status.has_children", "יש לך ילדים?", StageType.YESNO, None, None),
    Stage("family_status.children.is_under_14", "יש לי ילד עד גיל 14", StageType.YESNO, None, lambda responses: responses['family_status.has_children'] is True),
    
]


def chat_stage(chat_id) -> Tuple[int, Stage]:
    stage_index = conversation_state[chat_id]["state"]
    stage: Stage = STAGES[stage_index]
    return stage_index, stage


def present_choices(chat_id, enum_type, prompt):
    buttons = [
        [
            InlineKeyboardButton(text=choice.value, callback_data=f"choice_{enum_type.__name__}_{choice.name}")
            for choice in enum_type
        ]
    ]

    keyboard = InlineKeyboardMarkup(buttons)
    bot.send_message(chat_id, prompt, reply_markup=keyboard)


def choice_handler(chat_id, stage: Stage):
    present_choices(chat_id=chat_id, enum_type=stage.args, prompt=stage.prompt)


@bot.callback_query_handler(func=lambda callback: callback.data.startswith('choice_'))
def choice_cb(callback):
    params = callback.data.split("_")
    assert len(params) == 3
    assert params[0] == "choice"
    
    enum_type_name = params[1]
    enum_val_name = params[2]
    
    globals_dict = globals()
    EnumClass = globals_dict[enum_type_name]
    ENUM_VAR = EnumClass[enum_val_name]
    
    __, stage = chat_stage(callback.message.chat.id)
    if stage.answer_type == StageType.YESNO:
        val = (ENUM_VAR == YesNo.YES)
    else:
        val = ENUM_VAR.value

    handle_user_response(callback.message.chat.id, val)


def yesno_handler(chat_id, stage: Stage):
    present_choices(chat_id=chat_id, enum_type=YesNo, prompt=stage.prompt)



def date_handler(chat_id, stage: Stage):
    calendar, step = DetailedTelegramCalendar().build()
    bot.send_message(chat_id, stage.prompt, reply_markup=calendar)


@bot.callback_query_handler(func=DetailedTelegramCalendar.func())
def date_cb(callback):

    __, stage = chat_stage(callback.message.chat.id)
    
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
        
        handle_user_response(callback.message.chat.id, result)


def is_at_last_stage(chat_id: str) -> bool:
    return conversation_state[chat_id]["state"] == len(STAGES) - 1


@bot.message_handler(commands=["start"])
def handle_conversation_start(message):
    chat_id = message.chat.id
    conversation_state[chat_id] = {"state": 0, "responses": {}}
    ask_question(chat_id)


@bot.message_handler(func=lambda message: True)
def handle_user_message(message):
    chat_id = message.chat.id
    handle_user_response(chat_id, message.text)


def handle_user_response(chat_id, response):
    __, stage = chat_stage(chat_id)
    
    conversation_state[chat_id]["responses"][stage.key] = response
    
    if is_at_last_stage(chat_id=chat_id):
        # This was the last question
        get_results(chat_id=chat_id)
    else:
        # There are more
        conversation_state[chat_id]["state"] += 1
        ask_question(chat_id)


def ask_question(chat_id):
    __, stage = chat_stage(chat_id)
    
    if stage.condition is not None:
        should_show_next_question = stage.condition(conversation_state[chat_id]['responses'])
        if not should_show_next_question:
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
    del conversation_state[chat_id]


bot.polling()
