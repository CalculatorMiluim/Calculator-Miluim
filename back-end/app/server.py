from mangum import Mangum

from app.app import app
from app.api.health import health_router
from app.api.benefits import benefits_router
from app.api.location import location_router

app.include_router(health_router, prefix="/health")
app.include_router(benefits_router, prefix="/benefits")
app.include_router(location_router, prefix="/location")

handler = Mangum(app)
