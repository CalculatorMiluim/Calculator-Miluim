FROM --platform=linux/amd64 python:3.11-alpine

ARG ARG_BOT_TOKEN
ENV BOT_TOKEN=$ARG_BOT_TOKEN

COPY . /bot

WORKDIR /bot

RUN pip3 install -r /bot/requirements.txt

ENTRYPOINT ["python3", "telegram_bot.py"]