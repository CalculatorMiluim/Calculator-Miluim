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


state_to_question_handler = [
    reserve_duty_duration_handler,
    reserve_duty_type_handler
]


@bot.message_handler(commands=["start"])
def handle_conversation_start(message):
    chat_id = message.chat.id
    conversation_state[chat_id] = {"state": 0, "responses": {}}
    ask_question(chat_id)


@bot.message_handler(func=lambda message: True)
def handle_user_response(message):
    chat_id = message.chat.id
    state = conversation_state[chat_id]["state"]
    conversation_state[chat_id]["responses"][state] = message.text
    conversation_state[chat_id]["state"] += 1
    ask_question(chat_id)


def ask_question(chat_id):
    state = conversation_state[chat_id]["state"]
    question_handler = state_to_question_handler[state]
    question_handler(chat_id)
    conversation_state[chat_id]["state"] += 1


bot.polling()
