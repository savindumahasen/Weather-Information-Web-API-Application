import os
from flask import Flask
from dotenv import load_dotenv


app=Flask(__name__)
load_dotenv()


weather_API_key = os.getenv("weatherAPIKey")

if weather_API_key:
    print("API key is loaded successfully")
else:
    print("Api key is not loaded successfully")







if __name__=='__main__':
    app.run(debug=True, port=5000)