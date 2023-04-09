import os
import psycopg2
import psycopg2.extras
import json
from flask import Flask, render_template, request
from datetime import date, datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

def get_db_connection():
    connection = psycopg2.connect(
            host="postgres-db-instance.cs98xdhnh6w5.us-east-1.rds.amazonaws.com",
            database="database_postgres",
            user="postgres",
            password="Kalonji!23")

    return connection

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
        cursor.execute('INSERT INTO client VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', 
            (email,firstname,lastname,country,province_state,city,street_name,street_num,nas,date_enregistrement,telephone,zip_code,)
        )
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

@app.route('/reservations', methods=['POST'])
def post_reservation():
    try:
        # get all data from json body
        data = request.get_json(force=True)
        
        # get value for each key
        id_hotel = data['id_hotel']
        num_chambre = data['num_chambre']
        email_id = data['email_id']
        date_checkin = data['date_checkin']
        date_checkout = data['date_checkout']
        frais_total = data['frais_total']
        frais_restant = data['frais_restant']

        # connect to database
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('''
            INSERT INTO reservation VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)''',
            (id_hotel,num_chambre,email_id,date_checkin,date_checkout,frais_total,frais_restant,"false","false",)
        )
        connection.commit()

        # return json data of new location
        reservation_data = {
            "frais_restant": frais_restant,
            "frais_total": frais_total,
            "date_checkin": date_checkin,
            "date_checkout": date_checkout,
            "email_id": email_id,
            "num_chambre": num_chambre,
            "id_hotel": id_hotel,
            "cancelled": "false",
            "location": "false"
        }

        return json.dumps(reservation_data)

    except Exception as e:
        print(e) 
        
@app.route('/locations', methods=['POST'])
def post_location_with_reservation():
    try:
        # get all data from json body
        data = request.get_json(force=True)
        
        # get value for each key
        frais_restant = data['frais_restant']
        frais_total = data['frais_total']
        date_checkin = data['date_checkin']
        date_checkout = data['date_checkout']
        id_employe = data['id_employe']
        email_id = data['email_id']
        num_chambre = data['num_chambre']
        id_hotel = data['id_hotel']
        id_reservation = data['id_reservation']

        # connect to database
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('INSERT INTO location VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)', 
        (frais_restant,frais_total,date_checkin,date_checkout,email_id,num_chambre,id_hotel,id_reservation,id_employe,))
        connection.commit()

        # return json data of new location
        location_data = {
            "frais_restant": frais_restant,
            "frais_total": frais_total,
            "date_checkin": date_checkin,
            "date_checkout": date_checkout,
            "id_employe": id_employe,
            "email_id": email_id,
            "num_chambre": num_chambre,
            "id_hotel": id_hotel,
            "id_reservation": id_reservation
        }

        return json.dumps(location_data)

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

@app.route('/clients/exists') 
def check_if_client_exists():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        args = request.args
        email = args.get('email')
        json = []

        if(email is not None):
            cursor.execute('SELECT * FROM client WHERE LOWER(email_id) = LOWER((%s))', (email,))
            data = cursor.fetchall()
            if len(data) > 0:
                json.append({"exists": "true"})
            else:
                json.append({"exists": "false"})
            
        else:
            json.append({"error": "wrong input"})
            

        return json

    except Exception as e:
        print(e)

@app.route('/clients/exists/<nas>') 
def check_if_client_nas_exists(nas):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        json = []

        cursor.execute('SELECT * FROM client WHERE nas = (%s)', (nas,))
        data = cursor.fetchall()
        if len(data) > 0:
            json.append({"exists": "true"})
        else:
            json.append({"exists": "false"})
            
            

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
                "id_employe": data[i][14],
                "id_hotel": data[i][13]
            })

        return json

    except Exception as e:
        print(e)

# id_employe = ID de l'employé qui souhaite changer de email
# email = nouveau email de l'employé
@app.route('/employes/exists/<id_employe>') 
def check_email_in_database(id_employe):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        args = request.args
        email = args.get('email')
        json = []

        if(email is not None):
            cursor.execute('SELECT * FROM employe WHERE LOWER(email) = LOWER((%s)) AND id_employe != (%s)', (email,id_employe,))
            data = cursor.fetchall()
            if len(data) > 0:
                json.append({"email_already_taken_by_another_employee": "true"})
            else:
                json.append({"email_already_taken_by_another_employee": "false"})
            
        else:
            json.append({"error": "wrong input"})

        return json

    except Exception as e:
        print(e)

@app.route('/reservations') 
def get_reservations():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('''
        SELECT id_reservation,reservation.id_hotel,reservation.num_chambre,reservation.email_id,reservation.date_checkin,reservation.date_checkout,
        frais_total,frais_restant,canceler, locationcreer, hotel.rue, hotel.num_rue, hotel.postal_zip_code, chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
        from reservation join hotel on reservation.id_hotel = hotel.id_hotel join chaine on hotel.fk_chaine = chaine.id_chaine ORDER BY date_checkin ASC''')
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
                "location": data[i][9],
                "street_name": data[i][10],
                "street_num": data[i][11],
                "postal_code": data[i][12],
                "nom_chaine": data[i][13],
                "country": data[i][14],
                "province_state": data[i][15],
                "city": data[i][16]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations/<id_reservation>') 
def get_reservations_by_id(id_reservation):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM reservation WHERE id_reservation = (%s) ORDER BY date_checkin ASC', (id_reservation,))
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][9],
                "id_hotel": data[i][0],
                "num_chambre": data[i][1],
                "id_email": data[i][2],
                "date_checkin": data[i][3],
                "date_checkout": data[i][4],
                "frais_total": data[i][5],
                "frais_restant": data[i][6],
                "canceled": data[i][7],
                "location": data[i][8]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/reservations/canceled/<id_hotel>') 
def get_reservations_canceled(id_hotel):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM reservation WHERE canceler = true AND id_hotel = (%s) ORDER BY date_checkin ASC', (id_hotel,))
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][9],
                "id_hotel": data[i][0],
                "num_chambre": data[i][1],
                "id_email": data[i][2],
                "date_checkin": data[i][3],
                "date_checkout": data[i][4],
                "frais_total": data[i][5],
                "frais_restant": data[i][6],
                "canceled": data[i][7],
                "location": data[i][8]
            })

        return json

    except Exception as e:
        print(e)


@app.route('/reservations/pending') 
def get_reservations_pending():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        email_client = args.get('email_client')

        if(email_client is not None):
            cursor.execute('''
            SELECT id_reservation,reservation.id_hotel,reservation.num_chambre,reservation.email_id,reservation.date_checkin,reservation.date_checkout,
            frais_total,frais_restant,canceler, locationcreer, hotel.rue, hotel.num_rue, hotel.postal_zip_code, chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            from reservation join hotel on reservation.id_hotel = hotel.id_hotel join chaine on hotel.fk_chaine = chaine.id_chaine 
            WHERE reservation.canceler = false AND reservation.locationcreer = false AND LOWER(reservation.email_id) = LOWER(%s) ORDER BY reservation.date_checkin ASC''', (email_client,))
        else:
            cursor.execute('''
            SELECT id_reservation,reservation.id_hotel,reservation.num_chambre,reservation.email_id,reservation.date_checkin,reservation.date_checkout,
            frais_total,frais_restant,canceler, locationcreer, hotel.rue, hotel.num_rue, hotel.postal_zip_code, chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville 
            from reservation join hotel on reservation.id_hotel = hotel.id_hotel join chaine on hotel.fk_chaine = chaine.id_chaine
            WHERE reservation.canceler = false AND reservation.locationcreer = false ORDER BY reservation.date_checkin ASC''')
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
                "location": data[i][9],
                "street_name": data[i][10],
                "street_num": data[i][11],
                "postal_code": data[i][12],
                "nom_chaine": data[i][13],
                "country": data[i][14],
                "province_state": data[i][15],
                "city": data[i][16]
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
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND id_reservation = (%s) AND LOWER(email_id) = LOWER((%s)) ORDER BY date_checkin ASC', (id_hotel,id_reservation,email_client,))
        elif(email_client is not None):
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND LOWER(email_id) = LOWER((%s)) ORDER BY date_checkin ASC', (id_hotel,email_client,))
        elif(id_reservation is not None):
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) AND id_reservation = (%s) ORDER BY date_checkin ASC', (id_hotel,id_reservation,))
        else:
            cursor.execute('SELECT * FROM reservation WHERE canceler = false AND locationcreer = false AND id_hotel = (%s) ORDER BY date_checkin ASC', (id_hotel,))

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_reservation": data[i][9],
                "id_hotel": data[i][0],
                "num_chambre": data[i][1],
                "id_email": data[i][2],
                "date_checkin": data[i][3],
                "date_checkout": data[i][4],
                "frais_total": data[i][5],
                "frais_restant": data[i][6],
                "canceled": data[i][7],
                "location": data[i][8]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/locations') 
def get_locations():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args
        email_client = args.get('email_client')
        id_hotel = args.get('id_hotel')
        id_location = args.get('id_location')

        if(email_client is not None and id_hotel is not None and id_location is not None):
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE LOWER(email_id) = LOWER(%s) AND location.id_hotel = (%s) AND location.id_location = (%s) ORDER BY date_checkin DESC''', (email_client,id_hotel,id_location,))
        # elif(email_client is not None and id_hotel is not None):
        #     cursor.execute('''
        #     SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
        #     location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
        #     FROM location JOIN hotel 
        #     ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE LOWER(email_id) = LOWER(%s) AND id_hotel = (%s) ORDER BY date_checkin DESC''', (email_client,id_hotel,))
        elif(id_hotel is not None and email_client is not None):
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE location.id_hotel = (%s) AND LOWER(email_id) = LOWER(%s) ORDER BY date_checkin DESC''', (id_hotel,email_client,))
        elif(id_hotel is not None and id_location is not None):
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE location.id_hotel = (%s) AND location.id_location = (%s) ORDER BY date_checkin DESC''', (id_hotel,id_location,))
        elif(email_client is not None):
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE LOWER(email_id) = LOWER(%s) ORDER BY date_checkin DESC''', (email_client,))
    
        elif(id_hotel is not None):
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine WHERE location.id_hotel = (%s) ORDER BY date_checkin DESC''', (id_hotel,))
        else:
            cursor.execute('''
            SELECT location.id_location,location.frais_restant,location.frais_total,location.date_checkin,location.date_checkout,location.email_id,location.num_chambre,
            location.id_hotel,location.id_reservation,location.id_employe,hotel.rue,hotel.num_rue,hotel.postal_zip_code,chaine.nom_chaine,hotel.pays,hotel.province_state,hotel.ville
            FROM location JOIN hotel 
            ON location.id_hotel = hotel.id_hotel JOIN chaine ON hotel.fk_chaine = chaine.id_chaine ORDER BY date_checkin DESC''')

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_location": data[i][0],
                "frais_restant": data[i][1],
                "frais_total": data[i][2],
                "date_checkin": data[i][3],
                "date_checkout": data[i][4],
                "email_id": data[i][5],
                "num_chambre": data[i][6],
                "id_hotel": data[i][7],
                "id_reservation": data[i][8],
                "id_employe": data[i][9],
                "street_name": data[i][10],
                "street_num": data[i][11],
                "postal_code": data[i][12],
                "nom_chaine": data[i][13],
                "country": data[i][14],
                "province_state": data[i][15],
                "city": data[i][16]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/locations/<id_location>') 
def get_locations_by_id_location(id_location):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        cursor.execute('SELECT id_location, frais_restant, frais_total, date_checkin, date_checkout, email_id, num_chambre, id_hotel, id_reservation, id_employe FROM location WHERE id_location = (%s) ORDER BY date_checkin DESC', (id_location,))
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_location": data[i][0],
                "frais_restant": data[i][1],
                "frais_total": data[i][2],
                "date_checkin": data[i][3],
                "date_checkout": data[i][4],
                "email_id": data[i][5],
                "num_chambre": data[i][6],
                "id_hotel": data[i][7],
                "id_reservation": data[i][8],
                "id_employe": data[i][9]
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
                "id_chaine": data[i][10],
                "country": data[i][0],
                "province_state": data[i][1],
                "city": data[i][2],
                "street_name": data[i][3],
                "street_num": data[i][4],
                "zip_code": data[i][5],
                "nb_hotel": data[i][6],
                "email": data[i][7],
                "telephone": data[i][8].strip(),
                "nom_chaine": data[i][9]
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
        id_hotel = args.get('id_hotel')

        if (id_chaine is not None and id_hotel is not None):
            cursor.execute('SELECT * FROM hotel WHERE fk_chaine = (%s) AND id_hotel = (%s)', (id_chaine,id_hotel,))
        elif(id_chaine is not None):
            cursor.execute('SELECT * FROM hotel WHERE fk_chaine = (%s)', (id_chaine,))
        elif(id_hotel is not None):
            cursor.execute('SELECT * FROM hotel WHERE id_hotel = (%s)', (id_hotel,))
        else:
            cursor.execute('SELECT * FROM hotel')

        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "country": data[i][0],
                "province_state": data[i][1],
                "city": data[i][2],
                "street_name": data[i][3],
                "street_num": data[i][4],
                "zip_code": data[i][5],
                "nb_chambre": data[i][6],
                "telephone": data[i][7].strip(),
                "email": data[i][8],
                "rating": data[i][9],
                "id_chaine": data[i][10],
                "id_hotel": data[i][11],
            })

        return json

    except Exception as e:
        print(e)

# not used
# @app.route('/hotels/<country>',strict_slashes=True) 
# def get_hotels_by_country(country):
#     try:
#         connection = get_db_connection()
#         cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
#         args = request.args

#         #args
#         id_chaine = args.get('id_chaine')

#         if (id_chaine is not None):
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND fk_chaine = (%s)', (country,id_chaine,))

#         else:
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER(%s)', (country,))

#         data = cursor.fetchall()
#         json = []

#         for i in range(len(data)):
#             json.append({
#                 "country": data[i][0],
#                 "province_state": data[i][1],
#                 "city": data[i][2],
#                 "street_name": data[i][3],
#                 "street_num": data[i][4],
#                 "zip_code": data[i][5],
#                 "nb_chambre": data[i][6],
#                 "telephone": data[i][7].strip(),
#                 "email": data[i][8],
#                 "rating": data[i][9],
#                 "id_chaine": data[i][10],
#                 "id_hotel": data[i][11]
#             })

#         return json

#     except Exception as e:
#         print(e)

# @app.route('/hotels/<country>/<province_state>',strict_slashes=True) 
# def get_hotels_by_country_and_province_state(country,province_state):
#     try:
#         connection = get_db_connection()
#         cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
#         args = request.args

#         #args
#         id_chaine = args.get('id_chaine')

#         if (id_chaine is not None):
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND fk_chaine = (%s)', (country,province_state,id_chaine,))

#         else:
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s))', (country,province_state,))

#         data = cursor.fetchall()
#         json = []

#         for i in range(len(data)):
#             json.append({
#                 "country": data[i][0],
#                 "province_state": data[i][1],
#                 "city": data[i][2],
#                 "street_name": data[i][3],
#                 "street_num": data[i][4],
#                 "zip_code": data[i][5],
#                 "nb_chambre": data[i][6],
#                 "telephone": data[i][7].strip(),
#                 "email": data[i][8],
#                 "rating": data[i][9],
#                 "id_chaine": data[i][10],
#                 "id_hotel": data[i][11]
#             })

#         return json

#     except Exception as e:
#         print(e)

# @app.route('/hotels/<country>/<province_state>/<city>',strict_slashes=True) 
# def get_hotels_by_country_and_province_state_and_city(country,province_state,city):
#     try:
#         connection = get_db_connection()
#         cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
#         args = request.args

#         #args
#         id_chaine = args.get('id_chaine')

#         if (id_chaine is not None):
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND LOWER(ville) = LOWER((%s)) AND fk_chaine = (%s)', (country,province_state,city,id_chaine,))

#         else:
#             cursor.execute('SELECT * FROM hotel WHERE LOWER(pays) = LOWER((%s)) AND LOWER(province_state) = LOWER((%s)) AND LOWER(ville) = LOWER((%s))', (country,province_state,city,))

#         data = cursor.fetchall()
#         json = []

#         for i in range(len(data)):
#             json.append({
#                 "country": data[i][0],
#                 "province_state": data[i][1],
#                 "city": data[i][2],
#                 "street_name": data[i][3],
#                 "street_num": data[i][4],
#                 "zip_code": data[i][5],
#                 "nb_chambre": data[i][6],
#                 "telephone": data[i][7].strip(),
#                 "email": data[i][8],
#                 "rating": data[i][9],
#                 "id_chaine": data[i][10],
#                 "id_hotel": data[i][11]
#             })

#         return json

#     except Exception as e:
#         print(e)

@app.route('/rooms') 
def get_rooms():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        # mincapacite = args.get('mincapacite')
        # maxcapacite = args.get('maxcapacite')
        # minprice = args.get('minprice')
        # maxprice = args.get('maxprice')

        if(mincapacite is None):
            cursor.execute('SELECT * FROM chambre ORDER BY num_chambre ASC')

        else:
            cursor.execute( ''' SELECT * FROM chambre 
                                WHERE capacite BETWEEN (%s) AND (%s) AND prix BETWEEN (%s) AND (%s) ORDER BY num_chambre ASC''', (mincapacite,maxcapacite,minprice,maxprice,))
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

@app.route('/rooms/info') 
def get_rooms_with_info():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        cursor.execute( ''' SELECT prix,problemes,capacite,hotel_vue,tv,ac,refrigerateur,microonde,cafe,four,
                            chambre.id_hotel,chambre.num_chambre, hotel.pays,hotel.province_state,hotel.ville,
                            hotel.rue,hotel.num_rue,hotel.postal_zip_code,hotel.email,hotel.telephone,hotel.rating,
                            hotel.fk_chaine,chaine.nom_chaine FROM chambre 
                            JOIN hotel ON hotel.id_hotel = chambre.id_hotel JOIN chaine ON chaine.id_chaine = hotel.fk_chaine
                            ORDER BY num_chambre ASC
                        ''')

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
                "room_num": data[i][11],
                "country": data[i][12],
                "province_state": data[i][13],
                "city": data[i][14],
                "street_name": data[i][15],
                "street_num": data[i][16],
                "zip_code": data[i][17],
                "email_hotel": data[i][18],
                "telephone_hotel": data[i][19].strip(),
                "rating": data[i][20],
                "id_chaine": data[i][21],
                "chaine_name": data[i][22]
        })

        return json

    except Exception as e:
        print(e)

@app.route('/rooms/info/<id_hotel>/<room_num>') 
def get_rooms_by_hotel_and_room_num_with_info(id_hotel,room_num):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        cursor.execute( ''' SELECT prix,problemes,capacite,hotel_vue,tv,ac,refrigerateur,microonde,cafe,four,
                            chambre.id_hotel,chambre.num_chambre, hotel.pays,hotel.province_state,hotel.ville,
                            hotel.rue,hotel.num_rue,hotel.postal_zip_code,hotel.email,hotel.telephone,hotel.rating,
                            hotel.fk_chaine,chaine.nom_chaine FROM chambre 
                            JOIN hotel ON hotel.id_hotel = chambre.id_hotel JOIN chaine ON chaine.id_chaine = hotel.fk_chaine
                            WHERE chambre.id_hotel = (%s) AND chambre.num_chambre = (%s) ORDER BY num_chambre ASC
                        ''', (id_hotel,room_num,))

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
                "room_num": data[i][11],
                "country": data[i][12],
                "province_state": data[i][13],
                "city": data[i][14],
                "street_name": data[i][15],
                "street_num": data[i][16],
                "zip_code": data[i][17],
                "email_hotel": data[i][18],
                "telephone_hotel": data[i][19].strip(),
                "rating": data[i][20],
                "id_chaine": data[i][21],
                "chaine_name": data[i][22]
        })

        return json

    except Exception as e:
        print(e)

@app.route('/rooms/available/<checkin>/<checkout>') 
def get_rooms_available_by_date(checkin,checkout):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args
        id_hotel = args.get('id_hotel')

        if(id_hotel is not None):
            cursor.execute(''' 
                SELECT * FROM chambre WHERE id_hotel = (%s) AND CONCAT(id_hotel,num_chambre) NOT IN(
                    SELECT CONCAT(id_hotel,num_chambre) FROM reservation 
                    WHERE (date_checkin > (%s) AND date_checkin < (%s))
                    OR (date_checkout > (%s) AND date_checkout < (%s))
                    OR (date_checkin = (%s) AND date_checkout = (%s))
                    union
                    select concat(id_hotel,num_chambre) FROM location
                    where (date_checkin > (%s) AND date_checkin < (%s))
                    OR (date_checkout > (%s) AND date_checkout < (%s))
                    OR (date_checkin = (%s) AND date_checkout = (%s))
                )
                ORDER BY num_chambre ASC
            ''', (id_hotel,checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,))
        else:
            cursor.execute(''' 
                SELECT * FROM chambre WHERE CONCAT(id_hotel,num_chambre) NOT IN(
                    SELECT CONCAT(id_hotel,num_chambre) FROM reservation 
                    WHERE (date_checkin > (%s) AND date_checkin < (%s))
                    OR (date_checkout > (%s) AND date_checkout < (%s))
                    OR (date_checkin = (%s) AND date_checkout = (%s))
                    union
                    select concat(id_hotel,num_chambre) FROM location
                    where (date_checkin > (%s) AND date_checkin < (%s))
                    OR (date_checkout > (%s) AND date_checkout < (%s))
                    OR (date_checkin = (%s) AND date_checkout = (%s))
                )
                ORDER BY num_chambre ASC
            ''', (checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,checkin,checkout,))

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

@app.route('/rooms/<id_hotel>') 
def get_rooms_by_hotel_id(id_hotel):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT * FROM chambre WHERE id_hotel = (%s) ORDER BY num_chambre ASC', (id_hotel,))
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

@app.route('/canada/provinces') 
def get_canada_provinces():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT DISTINCT(province_state) FROM hotel WHERE pays = (%s)', ('Canada',))
        data = cursor.fetchall()
        provinces = []

        for i in range(len(data)):
            provinces.append(data[i][0])

        return provinces

    except Exception as e:
        print(e)

@app.route('/canada/cities') 
def get_canada_cities():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        cursor.execute('SELECT province_state,ville FROM hotel WHERE pays = (%s) GROUP BY province_state,ville', ('Canada',))
        data = cursor.fetchall()
        json = []
        provinces = []
        cities = []

        for i in range(len(data)):
            provinces.append(data[i][0])
            provinces = [i for n, i in enumerate(provinces) if i not in provinces[:n]]

        for i in range(len(provinces)):
            cities.append([])

        for i in range(len(data)):
            index = provinces.index(data[i][0])
            cities[index].append(data[i][1])

        for i in range(len(provinces)):
            tmp = []
            for j in range(len(cities[i])):
                tmp.append(cities[i][j])
            json.append({
                "province": provinces[i],
                "ville": tmp
            })

        return json

    except Exception as e:
        print(e)

@app.route('/us/states') 
def get_us_states():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT DISTINCT(province_state) FROM hotel WHERE pays = (%s)', ('Etats-Unis',))
        data = cursor.fetchall()
        states = []

        for i in range(len(data)):
            states.append(data[i][0])

        return states

    except Exception as e:
        print(e)

@app.route('/us/cities') 
def get_us_cities():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        cursor.execute('SELECT province_state,ville FROM hotel WHERE pays = (%s) GROUP BY province_state,ville', ('Etats-Unis',))
        data = cursor.fetchall()
        
        json = []
        states = []
        cities = []

        for i in range(len(data)):
            states.append(data[i][0])
            states = [i for n, i in enumerate(states) if i not in states[:n]]

        for i in range(len(states)):
            cities.append([])

        for i in range(len(data)):
            index = states.index(data[i][0])
            cities[index].append(data[i][1])
     
        for i in range(len(states)):
            tmp = []
            for j in range(len(cities[i])):
                tmp.append(cities[i][j])
            json.append({
                "state": states[i],
                "ville": tmp
            })

        return json

    except Exception as e:
        print(e)

@app.route('/clients/info/<email>', methods=['PATCH'])
def update_client_info_by_email(email):
    try:
        # get all data from json body
        data_received = request.get_json(force=True)

        # get value for each key
        firstname = data_received['firstname']
        lastname = data_received['lastname']
        country = data_received['country']
        province_state = data_received['province_state']
        city = data_received['city']
        street_name = data_received['street_name']
        street_num = data_received['street_num']
        zip_code = data_received['zip_code']
        telephone = data_received['telephone']

        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            '''UPDATE client SET prenom = (%s), nom = (%s), telephone = (%s), pays = (%s),
            province_state = (%s), ville = (%s), rue = (%s), num_rue = (%s), postal_zip_code = (%s)
            WHERE email_id = (%s)''', (firstname,lastname,telephone,country,province_state,city,street_name,street_num,zip_code,email,))
        connection.commit()
        new_client_info = []

        new_client_info.append({
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "country": country,
            "province_state": province_state,
            "city": city,
            "street_name": street_name,
            "street_num": street_num,
            "zip_code": zip_code,
            "telephone": telephone
        })

        return json.dumps(new_client_info)

    except Exception as e:
        print(e)

@app.route('/employes/info/<id_employe>', methods=['PATCH'])
def update_employe_info_by_id(id_employe):
    try:
        # get all data from json body
        data_received = request.get_json(force=True)

        # get value for each key
        email = data_received['email']
        firstname = data_received['firstname']
        lastname = data_received['lastname']
        country = data_received['country']
        province_state = data_received['province_state']
        city = data_received['city']
        street_name = data_received['street_name']
        street_num = data_received['street_num']
        zip_code = data_received['zip_code']
        telephone = data_received['telephone']
        salary = data_received['salary']
        poste = data_received['poste']

        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            '''UPDATE employe SET email = (%s), prenom = (%s), nom = (%s), salaire = (%s), poste_hotel = (%s), telephone = (%s), pays = (%s),
            province_state = (%s), ville = (%s), rue = (%s), num_rue = (%s), postal_zip_code = (%s)
            WHERE id_employe = (%s)''', (email,firstname,lastname,salary,poste,telephone,country,province_state,city,street_name,street_num,zip_code,id_employe,))
        connection.commit()
        new_employe_info = []

        new_employe_info.append({
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
            "salary": salary,
            "poste": poste,
            "id_employe": id_employe
        })

        return json.dumps(new_employe_info)

    except Exception as e:
        print(e)

# check /reservation/<id_reservation>
@app.route('/reservations/<id_reservation>', methods=['PATCH']) 
def update_reservations(id_reservation):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args

        canceled = args.get('canceled')
        checked_in = args.get('checked_in') # la location a été créer
        frais_restant = args.get('frais_restant')

        json = []

        # check if reservation exists
        # if(requests.get("http://127.0.0.1:5000/reservations/{id_reservation}") == []):
        #     json.append({"reservation not found": 404})
        #     return json

        # on peut cancellé une réservation
        if(canceled == "true"):
            cursor.execute('UPDATE reservation SET canceler = true WHERE id_reservation = (%s)', (id_reservation,))
            json.append({"reservation canceled": "true"})

        elif(checked_in is not None):
            cursor.execute('UPDATE reservation SET locationcreer = true WHERE id_reservation = (%s)', (id_reservation,))
            json.append({"reservation checked in": "true"})

        elif(frais_restant is not None):
            cursor.execute('UPDATE reservation SET frais_restant = (%s) WHERE id_reservation = (%s)', (frais_restant,id_reservation,))
            json.append({"updated amount": frais_restant})
        
        connection.commit()

        return json

    except Exception as e:
        print(e)

@app.route('/locations/<id_location>', methods=['PATCH']) 
def update_location(id_location):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args
        frais_restant = args.get('frais_restant')

        json = []

        if(frais_restant is not None):
            cursor.execute('UPDATE location SET frais_restant = (%s) WHERE id_location = (%s)', (frais_restant,id_location,))
            json.append({"updated amount": frais_restant})
        
        connection.commit()

        return json

    except Exception as e:
        print(e)

@app.route('/hotels/info/<id_hotel>', methods=['PATCH'])
def update_hotel_info_by_id(id_hotel):
    try:
        # get all data from json body
        data_received = request.get_json(force=True)

        # get value for each key
        rating = data_received['rating']
        email = data_received['email']
        country = data_received['country']
        province_state = data_received['province_state']
        city = data_received['city']
        street_name = data_received['street_name']
        street_num = data_received['street_num']
        zip_code = data_received['zip_code']
        telephone = data_received['telephone']

        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            '''UPDATE hotel SET rating = (%s), telephone = (%s), pays = (%s), email = (%s),
            province_state = (%s), ville = (%s), rue = (%s), num_rue = (%s), postal_zip_code = (%s)
            WHERE id_hotel = (%s)''', (rating,telephone,country,email,province_state,city,street_name,street_num,zip_code,id_hotel,))
        connection.commit()
        new_hotel_info = []

        new_hotel_info.append({
            "email": email,
            "rating": rating,
            "country": country,
            "province_state": province_state,
            "city": city,
            "street_name": street_name,
            "street_num": street_num,
            "zip_code": zip_code,
            "telephone": telephone,
            "id_hotel": id_hotel
        })

        return json.dumps(new_hotel_info)

    except Exception as e:
        print(e)

@app.route('/rooms/info/<id_hotel>/<room_num>', methods=['PATCH'])
def update_room_info_by_id(id_hotel,room_num):
    try:
        # get all data from json body
        data_received = request.get_json(force=True)

        # get value for each key
        prix = data_received['prix']
        problems = data_received['problems']
        capacity = data_received['capacity']
        vue = data_received['vue']
        tv = data_received['tv']
        ac = data_received['ac']
        refrigerator = data_received['refrigerator']
        microwave = data_received['microwave']
        coffee = data_received['coffee']
        oven = data_received['oven']

        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            '''UPDATE chambre SET prix = (%s), problemes = (%s), capacite = (%s), hotel_vue = (%s),
            tv = (%s), ac = (%s), refrigerateur = (%s), microonde = (%s), cafe = (%s), four = (%s)
            WHERE id_hotel = (%s) AND num_chambre = (%s)''', (prix,problems,capacity,vue,tv,ac,refrigerator,microwave,coffee,oven,id_hotel,room_num,))
        connection.commit()
        new_room_info = []

        new_room_info.append({
            "prix": prix,
            "problems": problems,
            "capacity": capacity,
            "vue": vue,
            "tv": tv,
            "ac": ac,
            "refrigerator": refrigerator,
            "microwave": microwave,
            "coffee": coffee,
            "id_hotel": id_hotel,
            "oven": oven,
            "room_num": room_num
        })

        return json.dumps(new_room_info)

    except Exception as e:
        print(e)

@app.route('/nbchambre/location') 
def get_nb_chambre_by_location():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute('SELECT pays,province_state,ville,nb_chambre FROM nb_chambre_par_location')
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "country": data[i][0],
                "province_state": data[i][1],
                "city": data[i][2],
                "nb_chambre": data[i][3]
            })

        return json

    except Exception as e:
        print(e)

@app.route('/capacite/hotel') 
def get_capacite_by_hotel():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
        args = request.args
        id_chaine = args.get('id_chaine')

        if(id_chaine is not None):
            cursor.execute('SELECT id_hotel,fk_chaine,capacite FROM capacite_par_hotel WHERE fk_chaine = (%s)', (id_chaine,))

        else:
            cursor.execute('SELECT id_hotel,fk_chaine,capacite FROM capacite_par_hotel')
            
        data = cursor.fetchall()
        json = []

        for i in range(len(data)):
            json.append({
                "id_hotel": data[i][0],
                "id_chaine": data[i][1],
                "capacite": data[i][2]
            })

        return json

    except Exception as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True)