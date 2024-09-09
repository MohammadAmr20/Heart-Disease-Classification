from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app,origins=["https://heart-disease-predict.netlify.app/"])

# Load the saved model
KNN_model = joblib.load('models/knn_model_pipeline.pkl')
log_model = joblib.load('models/log_model_pipeline.pkl')
NN_model = load_model('models/nn_model.h5')

# Load the rest of the pipeline
preprocessor = joblib.load('models/preprocessor_pipeline.pkl')

@app.route('/predict/knn', methods=['POST'])
def predictKNN():
    data = request.json
    print(data)
    df = pd.DataFrame(data,index=[0])
    predictions = KNN_model.predict(df)
    return jsonify(predictions.tolist())

@app.route('/predict/logistic',methods=['POST'])
def predictLogistic():
    data = request.json
    df = pd.DataFrame(data,index=[0])
    predictions = log_model.predict(df)
    return jsonify(predictions.tolist())

@app.route('/predict/nn',methods=['POST'])
def predictNN():
    data = request.json
    df = pd.DataFrame(data,index=[0])
    predictions = NN_model.predict(preprocessor.transform(df))
    predictions = (predictions > 0.5).astype(int)
    print(predictions)
    return jsonify(predictions[0].tolist())

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000,ssl_context="adhoc")
