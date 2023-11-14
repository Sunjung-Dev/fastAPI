# Usage 

```
git clone https://github.com/Sunjung-Dev/fastAPI.git
```
<br>
```
pip3 install -r requirements.txt
```
<br>
```
build
docker build --tag fastapitest:0.1 .
```
<br>
```
run
docker run --name fastapi_test -d -p 8000:8000 fastapitest:0.1
```



# fastAPI
To remind fastAPI

## To install FASTAPI 
```
pip install "fastapi[all]"
```

## To Run FASTAPI 
```
uvicorn main:app --reload
```

