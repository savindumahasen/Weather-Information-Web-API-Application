## import the necessary libraries
import os
from flask import Flask,jsonify,request, abort
from flask_caching  import Cache
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from dotenv import load_dotenv
from model import User, db
import json
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS



app=Flask(__name__)
app.config.from_object(ApplicationConfig)

# OR for more specific configuration:
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

bcrypt=Bcrypt(app)
## initialize the application
db.init_app(app)



with app.app_context():
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


@app.route("/token",methods=["POST"] )
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Check if user exists in database and credentials match
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"msg": "User cannot be found"}), 401
    
    # Check if password matches (assuming plain text for now - NOT recommended for production)
    if user.password != password:
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@app.route("/register", methods=["POST"])
def user_registration():
    email=request.json["email"]
    password=request.json["password"]


    user_exists = User.query.filter_by(email=email).first() is  not None

    if user_exists:
        return jsonify({"error":"User is already exist"}), 409
    #hashed_password=bcrypt.generate_password_hash(password)
    new_user= User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id":new_user.id,
        "email":new_user.email
    })


@app.route("/testtoken", methods=["POST"])
def testers_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Check if BOTH email and password are correct
    test_email="careers@fidenz.com"
    test_password= "Pass#fidenz"
    if email !=test_email and password!=test_password:
        return jsonify({"msg": "Invalid username or password"}), 401
      
    else:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
     


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