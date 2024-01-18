import os
from fastapi import FastAPI

DYNAMO_DB_ENDPOINT_URL = os.environ.get('DYNAMO_DB_ENDPOINT_URL', None)
app = FastAPI()
