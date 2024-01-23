import telebot
from telegram_bot_calendar import DetailedTelegramCalendar, LSTEP

# t.me/CalcMiluim_bot

BOT_TOKEN = "6346223964:AAGoCkra0oNHXwWRphjqVvhsfEM6ickBtbY"  # Replace with your actual bot token

bot = telebot.TeleBot(BOT_TOKEN)

conversation_state = {}


def reserve_duty_type_handler(chat_id):
    bot.send_message(chat_id, "What type of reserve duty did you do?")


def reserve_duty_duration_handler(chat_id):
    calendar, step = DetailedTelegramCalendar().build()
    bot.send_message(chat_id, f"Select {LSTEP[step]}", reply_markup=calendar)



state_to_question_handler = [
    reserve_duty_duration_handler,
    reserve_duty_type_handler
]


def is_at_last_stage(chat_id: str) -> bool:
    return conversation_state[chat_id]["state"] == len(state_to_question_handler) - 1


@bot.callback_query_handler(func=DetailedTelegramCalendar.func())
def cal(c):
    result, key, step = DetailedTelegramCalendar().process(c.data)
    if not result and key:
        bot.edit_message_text(f"Select {LSTEP[step]}",
                              c.message.chat.id,
                              c.message.message_id,
                              reply_markup=key)
    elif result:
        bot.edit_message_text(f"You selected {result}",
                              c.message.chat.id,
                              c.message.message_id)
        
        handle_user_response(c.message.chat.id, result)


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
    state = conversation_state[chat_id]["state"]
    conversation_state[chat_id]["responses"][state] = response
    
    if is_at_last_stage(chat_id=chat_id):
        # This was the last question
        get_results(chat_id=chat_id)
    else:
        # There are more
        conversation_state[chat_id]["state"] += 1
        ask_question(chat_id)


def ask_question(chat_id):
    state = conversation_state[chat_id]["state"]
    question_handler = state_to_question_handler[state]
    question_handler(chat_id)


def get_results(chat_id):
    bot.send_message(chat_id, "Done!")
    del conversation_state[chat_id]


bot.polling()
