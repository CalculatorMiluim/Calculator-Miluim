from mangum import Mangum

from app.app import app
from app.health import health_router


app.include_router(health_router, prefix="/health", tags=["Deployment"])

handler = Mangum(app)
