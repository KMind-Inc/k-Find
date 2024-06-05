# backend/Dockerfile 

FROM python:3.9-slim 

WORKDIR /app

COPY requirements.txt ./
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
RUN pip install --no-cache-dir -r requirements.txt

COPY kfind.py ./
COPY .env ./

EXPOSE 8081

CMD ["python", "kfind.py"]