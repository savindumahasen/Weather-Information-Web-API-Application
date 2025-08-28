import os
from flask import Flask,jsonify
from flask_caching  import Cache
from dotenv import load_dotenv
import json
import requests


app=Flask(__name__)
load_dotenv()


config={
    'CACHE_TYPE':'SimpleCache',
    'CACHE_DEFAULT_TIMEOUT':300
}

app.config.from_mapping(config)
cache=Cache(app)


weather_API_key = os.getenv("weatherAPIKey")

if weather_API_key:
    print("API key is loaded successfully")
else:
    print("Api key is not loaded successfully")

cityCodesArray = []

def  extractCityCode():
    with open('C:\\Users\\THIS PC\\Desktop\\fidenztechnologies(Assignment)\\Weather-Information-Web-API-Application\\backend\\cities.json','r') as file:
        data=json.load(file)
        for city_ids in data['List']:
            city_codes=city_ids['CityCode']
            print(city_codes)
            cityCodesArray.append(city_codes)
    print(cityCodesArray)
    return cityCodesArray


@app.route("/weather", methods=["GET"])
@cache.cached(timeout=300)
def retrieve_weather_data():
    cityCodes=extractCityCode()
    print(cityCodes)

    if not cityCodes:
        return jsonify("cityCodes  parameter is empty")
    else:
     try:
        weather_data_array=[]
        for city_id in cityCodes:
            url=f"https://api.openweathermap.org/data/2.5/weather?id={city_id}&units=metric&appid={weather_API_key}"
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