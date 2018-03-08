import firebase_admin
from firebase_admin import db
import flask
from flask import jsonify
from firebase_admin import credentials
import pyrebase
import time

app = flask.Flask(__name__)

config = {
  "apiKey": "AIzaSyAEmyharILrgtF8tLi7k5vaRSyEDPCh26c",
  "authDomain": "huitneufdix-123456.firebaseapp.com",
  "databaseURL": "https://huitneufdix-123456.firebaseio.com",
  "storageBucket": "huitneufdix-123456.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

ORDERS = db.child('orders').get()
#PRODUCTS = db.child('products')

@app.route('/getJourney/<profil>', methods=['POST', 'GET'])
def geJourney(profil):
    req = flask.request.json
    orders = []
    for current in ORDERS.val().items():
        orders.append(current)

    # get best order list
    order_list = defineBestCombinaison(orders, 200)

    # creation of a journey with order_list
    
    journey = {"orders": [item[0] for item in order_list], "ordered_orders": defineBestProductsList(order_list)}
    db.child('journeys').push(journey)

    return jsonify(204, "")


# Define best journey according to the user profile
def defineBestCombinaison(elements, target, best=[], partial=[]):
    current = 0
    best_sum = 0
    for i in partial:
        current += i[1].get("total_weight")
    for j in best:
        best_sum += j[1].get("total_weight")

    # check if the partial sum is equals to target
    if current == target: 
        #print "sum(%s)=%s" % (partial, target)
        return partial
    
    elif (current >= best_sum and current < target):
        best = partial

    elif (current > target):
        return best

    for i in range(len(elements)):
        n = elements[i]
        remaining = elements[i+1:]
        best = defineBestCombinaison(remaining, target, best, partial + [n])

    return best


# Define best product list from selected orders
def defineBestProductsList(order_list):
    list = []
    item = ()
    print(order_list)
    for current in order_list:
        for item in ORDERS.val().items():
            if item[0] == current[0]:
                products = item[1]['products']
                for product in products:
                    list.append(product)
    return list


# Start API
if __name__ == '__main__':
    app.run(debug = True)