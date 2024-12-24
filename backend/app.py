from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fabriq3d.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modèles
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(120), nullable=False)
    design_data = db.Column(db.JSON, nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/customize', methods=['POST'])
def save_customization():
    data = request.json
    # Logique de sauvegarde de la personnalisation
    return jsonify({'message': 'Design saved successfully'})

@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.json
    new_order = Order(
        customer_name=data['name'],
        customer_email=data['email'],
        design_data=data['design']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully', 'order_id': new_order.id})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
