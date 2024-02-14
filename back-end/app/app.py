import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

DYNAMO_DB_ENDPOINT_URL = os.environ.get('DYNAMO_DB_ENDPOINT_URL', None)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
