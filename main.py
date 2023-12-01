from fastapi import FastAPI, Form, Request, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from datetime import datetime
from aiohttp import web
import subprocess
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory='./templates')

@app.get("/")
def main():
    return "Hi"

class userInfo(BaseModel):
    memID: int = 0
    memName: str

@app.get("/main")
async def load_main(request: Request):
    return templates.TemplateResponse("/home.html", context={'request': request})
    

@app.get("/login")
async def login(request: Request):
    return templates.TemplateResponse("/login.html", context={'request': request})

@app.post("/api/auth/login/google/complete")
async def login(response: Response, user_info = userInfo):
    email = user_info.email
    print(email)
    return {"email": email}
    
@app.get("/api/auth/login/complete/{email}")
async def login(request: Request, email: str):
    return {"email": email}

#TODO: webrtc, fastapi 연동하기 
@app.get("/webrtc")
async def webrtc(request:Request):    
    # os.system("node ./server.js")
    # message = "sudo ./webrtc.sh"
    # result = subprocess.getstatusoutput(message)
    app = web.Application()
    app.router.add_get("./server.js", javascript)
    redirect_url = 'http://localhost:3000'
    return RedirectResponse(redirect_url)

@app.get("/gru/result")
async def gru_result(text: str):
    path = '/Users/yangayoung/Downloads/gru/main.py'
    subprocess.run(['python3', path, '--input_text', text], text=True)