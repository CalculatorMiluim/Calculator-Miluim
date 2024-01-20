from mangum import Mangum

from app.app import app
from app.health import health_router
from app.api.benefits import benefits_router

app.include_router(health_router, prefix="/health")
app.include_router(benefits_router, prefix="/benefits")

handler = Mangum(app)
