from fastapi import APIRouter

test_route = APIRouter()

@test_route.get("")
def test():
    return "test passed!"
