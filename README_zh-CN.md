# kFind
简体中文 | [English](README.md)

## 特性
新一代搜索引擎，汇聚深度和速度的搜索引擎，为您提供一触即达的信息体验。
- 普通模式：快速精准，即搜即得，满足您的日常信息需求。
- 深度模式：深入挖掘，全面详尽，为专业需求提供权威的深度资讯。

## 部署

### Docker-Compose
```shell
docker-compose up --build
```

### 手动部署
1. 安装 requirements.txt
```shell
pip3 install -r requirements.txt
```

2. 基础配置

- 获取AK

访问KMind进入kOS控制台，找到API设置，或者直接访问URL: https://kmind.com/workbench/act_list 点击左下角个人头像进入API设置

![ak](https://github.com/KMind-Inc/k-Find/blob/main/assets/ak.png?raw=true)

- 配置 .env 文件
```shell
cd server && vim .env
```
- 文件示例如下
```shell
PORT = 8081
API_URL = https://api.kmind.com/kmind/api/act
ACCESS_KEY = 
ACCESS_SECRET_KEY = 
```

3. 开启服务端服务
```shell
python3 kfind.py
```

4. 开启Web服务
```shell
cd web && npm install && npm run dev
```

## 联系我们

本项目由KMind团队维护, 你可以通过如下方式联系我们：
* 邮箱: developer@kmind.com
![wechat](https://github.com/KMind-Inc/k-Find/blob/main/assets/wechat.jpeg?raw=true)