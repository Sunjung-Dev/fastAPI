FROM python:3.12

WORKDIR /Users/kimsunjung/Desktop/dev/fastAPI
COPY ./ /test

WORKDIR /test
RUN pip3 install -r requirements.txt 

CMD uvicorn --host=0.0.0.0 --port 8000 main:app 

