from mangum import Mangum

from app.app import app
from app.health import health_router
from app.test import test_route
from app.api.benefits import benefits_router

app.include_router(health_router, prefix="/health")
app.include_router(test_route, prefix="/test")
app.include_router(benefits_router, prefix="/benefits")

handler = Mangum(app)
