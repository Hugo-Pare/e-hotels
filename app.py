import os
import psycopg2
import psycopg2.extras
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    connection = psycopg2.connect(
            host="postgres-db-instance.cs98xdhnh6w5.us-east-1.rds.amazonaws.com",
            database="database_postgres",
            user="postgres",
            password="Kalonji!23")

    return connection

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
        
if __name__ == '__main__':
    app.run(debug=True)