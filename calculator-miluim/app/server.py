from mangum import Mangum

from app.app import app
from app.api.benefits import benefits_router
from app.health import health_router

app.include_router(health_router, prefix="/health")
app.include_router(benefits_router, prefix="/benefits")

handler = Mangum(app)
