import os
import json
from loguru import logger
from dotenv import load_dotenv
from flask import Flask, Response, request, stream_with_context
import requests
import time

app = Flask(__name__)

load_dotenv()

def fetch_data(payload):
    with requests.post(os.getenv('API_URL'), headers={"Content-Type": "application/json"}, json=payload, stream=True) as resp:
        for line in resp.iter_content(chunk_size=9000):
            if line:
                try:
                    yield line.decode('utf-8', 'ignore')
                except UnicodeDecodeError as e:
                    logger.error(f"Unicode decode error: {e}")
                    pass

@app.route('/stream', methods=["GET", "OPTIONS"])
def start():
    if request.method == "OPTIONS":
        return Response(status=200)
    
    params = request.args.to_dict()
    
    payload = {
        "actCode": "searchAndAnswer",
        "action": "start",
        "accessKey": os.getenv('ACCESS_KEY'),
        "accessSecretKey": os.getenv('ACCESS_SECRET_KEY'),
        "actExecType": "sync",
        "isStreaming": True,
        "apiRequest": {
            "input": json.dumps({
                "query": params.get("query"), "searchSource": "INTERNET", "searchMode": params.get("search_type"), "returnReference": True
            })
        }
    }
    
    def generate():
        last_sent_time = time.time()
        timeout = 20  
        while True:
            current_time = time.time()
            if current_time - last_sent_time >= timeout:
                yield '{}\n\n'  
                last_sent_time = current_time
            else:
                for data in fetch_data(payload):
                    yield f"{data}\n\n"
                    last_sent_time = current_time
                return

    return Response(stream_with_context(generate()), content_type='text/event-stream')
                    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.getenv("PORT") or 8888))