from jscad import app
from flask import Flask, request, render_template, redirect, url_for, jsonify

import os
import json

app.config["JSCAD_FOLDER"] = "D:\SoftwareDevelopment\javascript\svg"
@app.route('/')
def index():
    return redirect(url_for('jscad'))

@app.route('/sample')
def sample():
    return render_template('sample.html')

@app.route('/jscad', methods=['GET', 'POST'])
def jscad():
    jsonOp=json.dumps({})
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            jsonOp = request.json
    # jsonOp= json.dumps({'editable':True, 'inifile':''})
    print(jsonOp)
    return render_template('index.html', jscadOption=jsonOp)

@app.route('/jscad/save', methods=['GET', 'POST'])
def jscad_save():
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            json = request.json
            print(json["name"])
            with open(os.path.join(app.config["JSCAD_FOLDER"],json["name"]), "w") as f:
                f.write(json["contents"])
                print("written!")
    return "comming soon"

@app.route('/jscad/open', methods=['GET', 'POST'])
def jscad_open():
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            json = request.json
            print("open request: " + json["name"])
            filepath = os.path.join(app.config["JSCAD_FOLDER"],json["name"])
            result={}
            with open(filepath, "r") as f:
                contents = f.read()
                print("read: " + json["name"])
                print("contents: " + contents)
                result = {'exist': True, 'contents': contents}
            return jsonify(result)
        return
    return
