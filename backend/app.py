import os
from flask import Flask
from dotenv import load_dotenv


app=Flask(__name__)





if __name__=='__main__':
    app.run(debug=True, port=5000)