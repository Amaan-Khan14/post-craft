from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routers import generate, posts, usage, profile, checkout, webhook
from app.middleware.auth import auth_middleware

load_dotenv()

app = FastAPI(title="PostCraft API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(posts.router, prefix="/api", tags=["posts"])
app.include_router(usage.router, prefix="/api", tags=["usage"])
app.include_router(profile.router, prefix="/api", tags=["profile"])
app.include_router(checkout.router, prefix="/api", tags=["checkout"])
app.include_router(webhook.router, prefix="/api", tags=["webhook"])

@app.get("/")
async def root():
    return {"message": "PostCraft API v1.0.0", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
