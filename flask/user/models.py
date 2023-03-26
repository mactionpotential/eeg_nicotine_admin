from flask import Flask, jsonify, request, session, redirect
import uuid
from passlib.hash import pbkdf2_sha256
from app import db

class User:

    # Create a session for the user so the dashboard page shows their info
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self):
        print(request.form)

        # Create user object
        user = {
            "_id": uuid.uuid4().hex,
            "name": request.form.get('name'),
            "email": request.form.get('email'),
            "password": request.form.get('password'),
        }

        #Encrypte passowrd
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        #Check for existing email address
        if db.users.find_one({"email": user['email'] }):
            return jsonify({ "error": "Email Address used already"}), 400
        
        if db.users.insert_one(user):
            return self.start_session(user)

        #return error if it gets to bottom
        return jsonify({"error": "Signup failed" }), 400
    
    def signout(self):
        session.clear()
        return redirect('/')
    
    def login(self):
        
        #To display all the user info, we actually only need to access
        #the user data which is stored in the session
        #for the sign up, we get it directly from the session created when the sign up form is triggered
        #for the login, we get the user data from the db and save it in the session as a JSON

        #Querying User and we have its password here
        user = db.users.find_one({
            "email": request.form.get('email')
        })
    
        #if user is found
        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
        
        #401 error: unauthorize
        #the code here mostly outputs json in the background
        #that we can view with inspect element,
        return jsonify({ "error": "Invalid login credentials"}), 401 