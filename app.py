import os
import psycopg2
import psycopg2.extras
import json
from flask import Flask, render_template, request
from datetime import date, datetime
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
def get_clients():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        args = request.args
        email = args.get('email')

        if(email is not None):
            cursor.execute('SELECT * FROM client WHERE LOWER(email_id) = LOWER((%s))', (email,))

        else:
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

@app.route('/employes') 
def get_employes():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        args = request.args
        id_employe = args.get('id_employe')

        if(id_employe is not None):
            cursor.execute('SELECT * FROM employe WHERE id_employe = (%s)', (id_employe,))

        else:
            cursor.execute('SELECT * FROM employe')
            
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "firstname": data[i][0],
                "lastname": data[i][1],
                "salaire": data[i][2],
                "poste": data[i][3],
                "email": data[i][4],
                "telephone": data[i][5].strip(),
                "nas": data[i][6],
                "country": data[i][7],
                "province_state": data[i][8],
                "city": data[i][9],
                "street_name": data[i][10],
                "street_num": data[i][11],
                "zip_code": data[i][12],
                "id_employe": data[i][13],
                "id_hotel": data[i][14]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations') 
def get_reservations():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM reservation')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][0],
                "id_hotel": data[i][1],
                "num_chambre": data[i][2],
                "id_email": data[i][3],
                "date_checkin": data[i][4],
                "date_checkout": data[i][5],
                "frais_total": data[i][6],
                "frais_restant": data[i][7],
                "canceled": data[i][8],
                "location": data[i][9]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations/<id_reservation>') 
def get_reservations_by_id(id_reservation):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM reservation WHERE id_reservation = (%s)', (id_reservation,))
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][0],
                "id_hotel": data[i][1],
                "num_chambre": data[i][2],
                "id_email": data[i][3],
                "date_checkin": data[i][4],
                "date_checkout": data[i][5],
                "frais_total": data[i][6],
                "frais_restant": data[i][7],
                "canceled": data[i][8],
                "location": data[i][9]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations/pending') 
def get_reservations_pending():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][0],
                "id_hotel": data[i][1],
                "num_chambre": data[i][2],
                "id_email": data[i][3],
                "date_checkin": data[i][4],
                "date_checkout": data[i][5],
                "frais_total": data[i][6],
                "frais_restant": data[i][7],
                "canceled": data[i][8],
                "location": data[i][9]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations/pending/<id_hotel>') 
def get_reservations_pending_by_hotel_id(id_hotel):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        id_reservation = args.get('id_reservation')
        email_client = args.get('email_client')
        date_checkin = args.get('date_checkin')

        # if statements
        if(id_reservation is not None and email_client is not None):
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND id_reservation = (%s) AND LOWER(email_id) = LOWER((%s))', (id_hotel,id_reservation,email_client,))
        elif(email_client is not None):
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND LOWER(email_id) = LOWER((%s))', (id_hotel,email_client,))
        elif(id_reservation is not None):
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND id_reservation = (%s)', (id_hotel,id_reservation,))
        else:
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s)', (id_hotel,))

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][0],
                "id_hotel": data[i][1],
                "num_chambre": data[i][2],
                "id_email": data[i][3],
                "date_checkin": data[i][4],
                "date_checkout": data[i][5],
                "frais_total": data[i][6],
                "frais_restant": data[i][7],
                "canceled": data[i][8],
                "location": data[i][9]
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

@app.route('/hotels') 
def get_hotels():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        #args
        id_chaine = args.get('id_chaine')

        if (id_chaine is not None):
            cursor.execute('SELECT * FROM hotel WHERE fk_chaine = (%s)', (id_chaine,))

        else:
            cursor.execute('SELECT * FROM hotel')

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_hotel": data[i][0],
                "country": data[i][1],
                "province_state": data[i][2],
                "city": data[i][3],
                "street_name": data[i][4],
                "street_num": data[i][5],
                "zip_code": data[i][6],
                "nb_chambre": data[i][7],
                "telephone": data[i][8].strip(),
                "email": data[i][9],
                "rating": data[i][10],
                "id_chaine": data[i][11]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/hotels/<country>',strict_slashes=True) 
def get_hotels_by_country(country):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        #args
        id_chaine = args.get('id_chaine')

        if (id_chaine is not None):
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND fk_chaine = (%s)', (country,id_chaine,))

        else:
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER(%s)', (country,))

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_hotel": data[i][0],
                "country": data[i][1],
                "province_state": data[i][2],
                "city": data[i][3],
                "street_name": data[i][4],
                "street_num": data[i][5],
                "zip_code": data[i][6],
                "nb_chambre": data[i][7],
                "telephone": data[i][8].strip(),
                "email": data[i][9],
                "rating": data[i][10],
                "id_chaine": data[i][11]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/hotels/<country>/<province_state>',strict_slashes=True) 
def get_hotels_by_country_and_province_state(country,province_state):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        #args
        id_chaine = args.get('id_chaine')

        if (id_chaine is not None):
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND fk_chaine = (%s)', (country,province_state,id_chaine,))

        else:
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s))', (country,province_state,))

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_hotel": data[i][0],
                "country": data[i][1],
                "province_state": data[i][2],
                "city": data[i][3],
                "street_name": data[i][4],
                "street_num": data[i][5],
                "zip_code": data[i][6],
                "nb_chambre": data[i][7],
                "telephone": data[i][8].strip(),
                "email": data[i][9],
                "rating": data[i][10],
                "id_chaine": data[i][11]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/hotels/<country>/<province_state>/<city>',strict_slashes=True) 
def get_hotels_by_country_and_province_state_and_city(country,province_state,city):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        #args
        id_chaine = args.get('id_chaine')

        if (id_chaine is not None):
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND LOWER(ville) = LOWER((%s)) AND fk_chaine = (%s)', (country,province_state,city,id_chaine,))

        else:
            cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND LOWER(ville) = LOWER((%s))', (country,province_state,city,))

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_hotel": data[i][0],
                "country": data[i][1],
                "province_state": data[i][2],
                "city": data[i][3],
                "street_name": data[i][4],
                "street_num": data[i][5],
                "zip_code": data[i][6],
                "nb_chambre": data[i][7],
                "telephone": data[i][8].strip(),
                "email": data[i][9],
                "rating": data[i][10],
                "id_chaine": data[i][11]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/rooms') 
def get_rooms():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM chambre')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "prix": data[i][0],
                "problems": data[i][1],
                "capacity": data[i][2],
                "vue": data[i][3],
                "tv": data[i][4],
                "ac": data[i][5],
                "refrigerator": data[i][6],
                "microwave": data[i][7],
                "coffee": data[i][8],
                "oven": data[i][9],
                "id_hotel": data[i][10],
                "room_num": data[i][11]
            })

        return json

    except Exception as e:
        print(e)

# check /reservation/<id_reservation> "paid_amount" <= "frais_restant" avant de fetch PATCH
@app.route('/reservations/<id_reservation>', methods=['PATCH']) 
def update_reservations(id_reservation):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        canceled = args.get('canceled')
        checked_in = args.get('checked_in') # la location a été créer
        paid_amount = args.get('paid_amount')

        # check if reservation exists
        if(requests.get("http://127.0.0.1:5000/reservations/{id_reservation}") == []):
            json.append({"reservation not found": 404})
            return json

        # on peut cancellé une réservation
        if(canceled == True):
            cursor.execute('UPDATE reservation SET canceler = true WHERE id_reservation = (%s)', (id_reservation,))
            json.append({"canceled reservation": 200})
            return json
        
        elif((checked_in is not None) and (paid_amount is not None)):
            # update frais restant
            cursor.execute('UPDATE reservation SET locationcreer = true AND frais_restant = frais_restant - (%s) WHERE id_reservation = (%s)', (paid_amount,id_reservation,))
            json.append({"updated reservation": 200})

        elif((checked_in is not None)):
            cursor.execute('UPDATE reservation SET locationcreer = true WHERE id_reservation = (%s)', (id_reservation,))
            json.append({"updated reservation": 200})

        elif((paid_amount is not None)):
            cursor.execute('UPDATE reservation SET frais_restant = frais_restant - (%s) WHERE id_reservation = (%s)', (paid_amount,id_reservation,))
            json.append({"updated reservation": 200})

        else:
            json.append({"reservation unchanged": 200})

        return json

    except Exception as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True)