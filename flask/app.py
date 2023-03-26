from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo

app = Flask(__name__)

#set up secret.key
app.secret_key = b's\xf9\xe9W\x84\xc9k\x0e\x89\xc5u;\x92\xd2\xae$'

#Database
client = pymongo.MongoClient("mongodb+srv://user1:dbpassword@cluster1.tkcmesg.mongodb.net/?retryWrites=true&w=majority")
db = client.user_login_system

# Decorators, decide whether or not to allow user go to specific pages
def login_required(f):
    @wraps(f)
    def wrap(*arg, **kwargs):
        #checks if user is logged in
        if 'logged_in' in session:
            #if yes, it renders the dashboard templates
            return f(*arg, **kwargs)
        else:
            #if not, it redirects to the home pahe
            return redirect('/')
        
    return wrap


#We need to import our routes as well in this file
from user import routes

#create route
@app.route('/')
def home():
    return render_template('home.html')

#best rout to assure that assure lands on that page
@app.route('/dashboard/')

#checks if user is logged in before even allowing access to dashboard
@login_required

def dashbaord():
    return render_template('dashboard.html')

#create file to automatically excute flask
#set up two templates one for Home page and another for dashboard page

#arduino stuff
