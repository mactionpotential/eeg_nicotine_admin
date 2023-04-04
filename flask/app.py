from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo
import serial

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
    # Render the dashboard template with the current LED status
    return render_template("dashboard.html", status='OFF')

#create file to automatically excute flask
#set up two templates one for Home page and another for dashboard page

#arduino stuff (V1)
ser = serial.Serial('/dev/cu.usbmodem11101', 9600)

# Define route for turning LED on
@app.route('/turn_on/')
def turn_on():
    ser.write(b'1')  # Send "1" to Arduino to turn on LED
    #return 'LED turned on!'
    return render_template("dashboard.html", status="LED is oN")

# Define route for turning LED off
@app.route('/turn_off/')
def turn_off():
    ser.write(b'0')  # Send "0" to Arduino to turn off LED
    #return 'LED turned off!'
    return render_template("dashboard.html", status="LED is off")

# @app.route("/turn-on/")
# def turn_on():
#     # Open the serial port and send the "on" command
#     with serial.Serial("/dev/cu.usbmodem11201", 9600) as ser:
#         ser.write(b"on")

#     # Render the dashboard template with the "LED is on" status message
#     return render_template("dashboard.html", status="LED is off")

# @app.route("/turn-off/")
# def turn_off():
#     # Open the serial port and send the "off" command
#     with serial.Serial("/dev/cu.usbmodem11201", 9600) as ser:
#         ser.write(b"off")

#     # Render the dashboard template with the "LED is off" status message
#     return render_template("dashboard.html", status="LED is off")
