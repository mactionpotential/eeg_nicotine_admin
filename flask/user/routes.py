#contain all the routes like user/signup or /user/login

from flask import Flask

#We need the app instance to create routes, so we need 
#the app is an instance of Flask
from app import app
from user.models import User

#create new app route
@app.route('/user/signup', methods=['POST'])

def signup():
    #we need to run the data schema made in models.py
    return User().signup()
    #or we could do like this: user = User(), return user.signup()

@app.route('/user/signout')
def sigout():
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    return User().login()