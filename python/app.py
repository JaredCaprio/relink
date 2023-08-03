from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import jieba
import sys
app = Flask(__name__)
cors = CORS(app)


app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=["GET"])
def home_route():
    return '<h1>Jieba service for the Relink Chinese Learning app</h1>'


@app.route('/segmentText', methods=["POST"])
def api_run_script():    
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        text = json.get('body', '')
        seg_list = jieba.cut(text)
        result = " ".join(seg_list)
        return result
    else:
        return 'Content-Type not supported!'


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)