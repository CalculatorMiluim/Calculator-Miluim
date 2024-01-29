from datetime import date
from enum import Enum
from typing import Any, List, Optional

from pydantic import BaseModel


class StageType(Enum):
    DATE = "date"
    CHOICE = "choice"
    YESNO = "yesno"


class Option(BaseModel):
    name: str
    text: str
    val: Any


class Value(BaseModel):
    type: str
    options: List[Option]

    def option_from_name(self, name):
        for option in self.options:
            if option.name == name:
                return option
        raise Exception(f"Unknown option name {name} for type {self.type}")


class Condition(BaseModel):
    ref: str
    equals: Any


class Stage(BaseModel):
    api_key: str
    prompt: str
    answer_type: StageType
    min_date: Optional[date] = None
    choices: Optional[str] = None
    exclude_from_api: Optional[bool] = False
    condition: Optional[Condition] = None


class StageGroup(BaseModel):
    repeats: Optional[bool] = False
    min_repeats: Optional[int] = 1
    max_repeats: Optional[int] = 1
    repeat_prompt: Optional[str] = None
    stages: List[Stage]


class Defs(BaseModel):
    values: List[Value]
    stage_groups: List[StageGroup]

    def value_from_name(self, name: str):
        for value in self.values:
            if value.type == name:
                return value
        
        raise Exception(f"Unknown value type {name}")

