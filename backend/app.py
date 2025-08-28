import os
from flask import Flask
from dotenv import load_dotenv
import json


app=Flask(__name__)
load_dotenv()


weather_API_key = os.getenv("weatherAPIKey")

if weather_API_key:
    print("API key is loaded successfully")
else:
    print("Api key is not loaded successfully")


with open('C:\\Users\\THIS PC\\Desktop\\fidenztechnologies(Assignment)\\Weather-Information-Web-API-Application\\backend\\cities.json','r') as file:
    data=json.load(file)
    print(data)
     




if __name__=='__main__':
    app.run(debug=True, port=5000)