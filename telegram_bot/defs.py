from datetime import date
from enum import Enum
from typing import Any, List, Optional, Union

from pydantic import BaseModel, validator


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
    
    def is_valid_value(self, val):
        for option in self.options:
            if option.val == val:
                return True
        return False


class Condition(BaseModel):
    ref: str
    equals: Any


class Stage(BaseModel):
    api_key: str
    prompt: str
    answer_type: StageType
    default: Optional[Any] = None
    min_date: Optional[Union[date, str]] = None
    max_date: Optional[Union[date, str]] = None
    choices: Optional[str] = None
    exclude_from_api: Optional[bool] = False
    condition: Optional[Condition] = None
    
    @validator('min_date', 'max_date', pre=True)
    def parse_date_value(cls, v):
        if v == "today":
            return date.today()
        if v == "last_selected":
            return v
        elif isinstance(v, str):
            try:
                return date.fromisoformat(v)
            except ValueError:
                raise ValueError("Invalid date format. Must be YYYY-MM-DD or 'today'.")
        return v


class StageGroup(BaseModel):
    repeats: Optional[bool] = False
    min_repeats: Optional[int] = 1
    max_repeats: Optional[int] = 1
    repeat_prompt: Optional[str] = None
    api_key: Optional[str] = None
    stages: List[Stage]


class Defs(BaseModel):
    values: List[Value]
    stage_groups: List[StageGroup]

    def value_from_name(self, name: str):
        for value in self.values:
            if value.type == name:
                return value
        
        raise Exception(f"Unknown value type {name}")

