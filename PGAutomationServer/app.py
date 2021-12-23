import os
from flask import Flask, json, redirect, request, render_template, send_file, jsonify, url_for
from werkzeug.utils import secure_filename
import util

UPLOAD_FOLDER = r"./PDF"
ALLOWED_EXTENSIONS = {"pdf"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/send', methods=['POST'])
def send():
    # os.chdir(os.path.dirname(os.path.abspath(__file__)))
    # input_pdf = request.files.get("input-file")
    # print(input_pdf.filename)
    # if input_pdf and allowed_file(input_pdf.filename):
    #     filename = input_pdf.filename
    #     print(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    #     input_pdf.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
    # n = util.parce_pdf()
    n = 3
    if n != False:
        return_data = {"result": util.create_response(n)}
        print(return_data)
        return jsonify(responseResult=json.dumps(return_data), aspectRatio=util.getAspectRatio())
    else:
        return None


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8090, debug=True)
