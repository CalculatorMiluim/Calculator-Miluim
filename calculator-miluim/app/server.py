from mangum import Mangum

from app.app import app
from app.health import health_router
from app.test import test_route


app.include_router(health_router, prefix="/health")
app.include_router(test_route, prefix="/test")

handler = Mangum(app)
