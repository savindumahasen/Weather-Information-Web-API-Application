import os
from flask import Flask,jsonify
from dotenv import load_dotenv
import json


app=Flask(__name__)
load_dotenv()


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
def retrieve_weather_data():
    cityCodes=extractCityCode()
    print(cityCodes)

    if not cityCodes:
        return jsonify("cityCodes  parameter is empty")
    else:
        return jsonify("citycodes parameter is not empty")
      

     




if __name__=='__main__':
    app.run(debug=False, port=5000)