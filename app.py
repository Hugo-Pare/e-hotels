import os
import psycopg2
import psycopg2.extras
import json
from flask import Flask, render_template, request
from datetime import date
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    connection = psycopg2.connect(
            host="postgres-db-instance.cs98xdhnh6w5.us-east-1.rds.amazonaws.com",
            database="database_postgres",
            user="postgres",
            password="Kalonji!23")

    return connection

### TESTS --- START ###

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/test1') 
def test1():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM test')
        num = cursor.fetchall()

        return num

    except Exception as e:
        print(e)

@app.post('/test2/<num>') 
def test2(num):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('INSERT INTO test VALUES (%s)', [num])
        connection.commit()

        return []

    except Exception as e:
        print(e)

@app.route('/test3', methods=['POST']) 
def test3():
    try:
        data = request.json
        num = data['num']
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('INSERT INTO test VALUES (%s)', [num])
        connection.commit()
        return json.dumps(num)

    except Exception as e:
        print(e)

### TESTS --- END ###

@app.route('/signup/client', methods=['POST'])
def signup_user():
    try:
        # get all data from json body
        data = request.get_json(force=True)

        # get value for each key
        email = data['email']
        firstname = data['firstname']
        lastname = data['lastname']
        country = data['country']
        province_state = data['province_state']
        city = data['city']
        street_name = data['street_name']
        street_num = data['street_num']
        zip_code = data['zip_code']
        telephone = data['telephone']
        nas = data['nas']

        today = date.today()
        date_enregistrement = today.strftime("%Y-%m-%d")

        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('INSERT INTO client VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', (email,firstname,lastname,country,province_state,city,street_name,street_num,nas,date_enregistrement,telephone,zip_code))
        connection.commit()

        client_data = {
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "country": country,
            "province_state": province_state,
            "city": city,
            "street_name": street_name,
            "street_num": street_num,
            "zip_code": zip_code,
            "telephone": telephone,
            "nas": nas,
            "date_enregistrement": date_enregistrement
        }

        # returns json data of new user
        return json.dumps(client_data)

    except Exception as e:
        print(e)
        
@app.route('/clients') 
def get_client():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM client')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "email": data[i][0],
                "firstname": data[i][1],
                "lastname": data[i][2],
                "country": data[i][3],
                "province_state": data[i][4],
                "city": data[i][5],
                "street_name": data[i][6],
                "street_num": data[i][7],
                "zip_code": data[i][11],
                "telephone": data[i][10].strip(),
                "nas": data[i][8],
                "date_enregistrement": data[i][9],
            })

        return json

    except Exception as e:
        print(e)

@app.route('/chaines') 
def get_chaines():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM chaine')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_chaine": data[i][0],
                "country": data[i][1],
                "province_state": data[i][2],
                "city": data[i][3],
                "street_name": data[i][4],
                "street_num": data[i][5],
                "zip_code": data[i][6],
                "nb_hotel": data[i][7],
                "email": data[i][8],
                "telephone": data[i][9].strip(),
                "nom_chaine": data[i][10]
            })

        return json

    except Exception as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True)