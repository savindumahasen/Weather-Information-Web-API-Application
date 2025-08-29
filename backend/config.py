from dotenv import load_dotenv
import os
import pymysql

load_dotenv()

class ApplicationConfig:
    SECRET_KEY=os.getenv("secretKey")
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI= f"mysql+pymysql://root:@localhost:3306/logincredentials"
