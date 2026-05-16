import requests
from flask import Flask, request, jsonify
# Supabase ক্লায়েন্ট ইনিশিয়ালাইজ করা আছে ধরে নিচ্ছি

app = Flask(__name__)

GATEWAY_URL = "https://sandbox.aamarpay.com/jsonpost.php" # উদাহরণ হিসেবে
STORE_ID = "your_store_id"
SIGNATURE_KEY = "your_signature_key"

@app.route('/initiate-payment', methods=['POST'])
def initiate_payment():
    data = request.json
    user_id = data.get('user_id')
    amount = data.get('amount')
    
    # ১. Supabase-এ স্ট্যাটাস 'pending' হিসেবে এন্ট্রি তৈরি করো
    # transaction_id = generate_unique_id()
    # insert_to_supabase(user_id, amount, 'pending', transaction_id)

    payload = {
        "store_id": STORE_ID,
        "signature_key": SIGNATURE_KEY,
        "tran_id": "UNIQUE_TRANSACTION_ID", # Supabase থেকে জেনারেট করা আইডি
        "success_url": "https://yourdomain.com/payment/success",
        "fail_url": "https://yourdomain.com/payment/fail",
        "cancel_url": "https://yourdomain.com/payment/cancel",
        "amount": amount,
        "currency": "BDT",
        "desc": "Foundation Donation or Access Fee",
        "cus_name": "User Name",
        "cus_email": "user@example.com",
        "cus_phone": "017XXXXXXXX",
        "type": "json"
    }

    # গেটওয়েতে রিকোয়েস্ট পাঠানো
    response = requests.post(GATEWAY_URL, json=payload)
    gateway_data = response.json()

    # ফ্রন্টএন্ডে পেমেন্ট URL পাঠিয়ে দেওয়া
    if response.status_code == 200 and 'payment_url' in gateway_data:
        return jsonify({"payment_url": gateway_data['payment_url']})
    else:
        return jsonify({"error": "Payment initiation failed"}), 500
