from fastapi import FastAPI, Form, Request, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
from datetime import datetime


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory='./templates')

class userInfo(BaseModel):
    memID: int = 0
    memName: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/main")
async def load_main(request: Request):
    return templates.TemplateResponse("/home.html", context={'request': request})
    

@app.get("/login")
async def login(request: Request):
    return templates.TemplateResponse("/login.html", context={'request': request})

@app.post("/api/auth/google/complete")
async def login(response: Response, user_info = userInfo):
    name = user_info.memName
    print(name)
    return {"name": name}

