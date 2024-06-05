# kFind
English | [简体中文](README_zh-CN.md)

## Features
A new generation of search engines, bringing together depth and speed to provide you with a one-touch information experience.
- SIMPLE mode: Fast and accurate, instantly searchable, to meet your daily information needs.
- Deep mode: Dig deep, comprehensive and detailed, to provide authoritative in-depth information for professional needs.

## Setup

### Docker-Compose
```shell
docker-compose up --build
```

### Manual
1. install requirements.txt
```shell
pip3 install -r requirements.txt
```

2. basic configuration

- get AK from kOS

Visit [kMind](https://kmind.com/) into kOS console, find the API settings, or direct access to the URL https://kmind.com/workbench/act_list, click your profile picture in the lower left corner to enter API Settings

![ak](https://github.com/KMind-Inc/k-Find/blob/main/assets/ak.png?raw=true)

- Configuring environment variables
```shell
cd server && vim .env
```
- .env example
```shell
PORT = 8081
WORKERS = 1
API_URL = https://api.kmind.com/kmind/api/act
ACCESS_KEY = 
ACCESS_SECRET_KEY = 
```

3. start server 
```shell
python3 kfind.py
```

4. start web
```shell
cd web && npm install && npm run dev
```

## Contacts

This project is maintained by the KMind team, you can contact us by:
* Email: developer@kmind.com
![wechat](https://github.com/KMind-Inc/k-Find/blob/main/assets/wechat.jpeg?raw=true)