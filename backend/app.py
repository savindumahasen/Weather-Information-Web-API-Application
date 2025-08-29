## import the necessary libraries
import os
from flask import Flask,jsonify
from flask_caching  import Cache
from dotenv import load_dotenv
from model import User, db
import json
import requests


app=Flask(__name__)

## initialize the application
db.init_app(app)
db.create_all()

## load the variables from .env file  into environment variables
load_dotenv()

## Config the cache
config={
    'CACHE_TYPE':'SimpleCache',
    'CACHE_DEFAULT_TIMEOUT':300       ## 5 minutes =300 seconds
}

app.config.from_mapping(config)
cache=Cache(app)

## set the APi key into variable
weather_API_Key = os.getenv("weatherAPIKey")

## check whether vairable has value or not
if weather_API_Key:
    print("API key is loaded successfully")
else:
    print("Api key is not loaded successfully")

## define an array
cityCodesArray = []

## create the function to  extract the city codes
def  extractCityCode():
    with open('C:\\Users\\THIS PC\\Desktop\\fidenztechnologies(Assignment)\\Weather-Information-Web-API-Application\\backend\\cities.json','r') as file:
        data=json.load(file)
        for city_ids in data['List']:
            city_codes=city_ids['CityCode']
            print(city_codes)
            cityCodesArray.append(city_codes)
    print(cityCodesArray)
    return cityCodesArray


@app.route("/")
def home():
    return 

## define the route
@app.route("/weather", methods=["GET"])
## implement the caching
@cache.cached(timeout=300)
def retrieve_weather_data():
    cityCodes=extractCityCode()
    print(cityCodes)

    if not cityCodes:
        return jsonify("cityCodes  parameter is empty")
    else:
     try:
        weather_data_array=[]
        for city_code in cityCodes:
            ## Build the API URL with city_id and weather_API_Key parameters
            url=f"https://api.openweathermap.org/data/2.5/weather?id={city_code}&units=metric&appid={weather_API_Key}"
            response=requests.get(url)
            weather_data=response.json()
            print(weather_data)
            weather_data_array.append(weather_data)
        print(weather_data_array)
        return jsonify(weather_data_array)   
     except:
         return jsonify("Failing to  fetch the data")


if __name__=='__main__':
    app.run(debug=False, port=5000)