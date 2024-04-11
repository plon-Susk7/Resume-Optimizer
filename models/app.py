from flask import Flask,request, jsonify
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import numpy as np

app = Flask(__name__)

# load model

model = AutoModelForSequenceClassification.from_pretrained("google-bert/bert-base-cased", num_labels=25) 
tokenizer = AutoTokenizer.from_pretrained("google-bert/bert-base-cased") 
model.load_state_dict(torch.load('pretrained_model.pth'))
model.to('cpu')
model.eval()


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/predict',methods=['POST'])
def predict():
    # get data from request
    '''
        Request format:
        {
            "data": "This is a sample text"
        }
    '''
    text = request.get_json(force=True)
    
    # make prediction
    data = tokenizer(text['data'],padding="max_length",truncation=True, return_tensors="pt")
    prediction = model(**data).logits.detach().numpy().tolist()[0]
    return jsonify({"result" : prediction})

if __name__ == '__main__':

    app.run()