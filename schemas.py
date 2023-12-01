from pydantic import BaseModel
from datetime import datetime

class userInfo(BaseModel):
    memID: int = 0
    email: str
    
