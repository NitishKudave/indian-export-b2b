import hmac
import hashlib
import base64
import json
import time

def base64url_encode(data):
    if isinstance(data, str):
        data = data.encode('utf-8')
    encoded = base64.urlsafe_b64encode(data).decode('utf-8')
    return encoded.rstrip('=')

def base64url_decode(data):
    padding = '=' * (4 - (len(data) % 4))
    return base64.urlsafe_b64decode(data + padding)

def generate_jwt(payload, secret, expiry_seconds=86400):
    header = {"alg": "HS256", "typ": "JWT"}
    
    # Set expiration
    payload_copy = payload.copy()
    payload_copy['exp'] = int(time.time()) + expiry_seconds
    
    header_json = json.dumps(header, separators=(',', ':'))
    payload_json = json.dumps(payload_copy, separators=(',', ':'))
    
    unsigned_token = f"{base64url_encode(header_json)}.{base64url_encode(payload_json)}"
    
    signature = hmac.new(
        secret.encode('utf-8'),
        unsigned_token.encode('utf-8'),
        hashlib.sha256
    ).digest()
    
    return f"{unsigned_token}.{base64url_encode(signature)}"

def verify_jwt(token, secret):
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
            
        header_segment, payload_segment, crypto_segment = parts
        
        # Verify signature
        unsigned_token = f"{header_segment}.{payload_segment}"
        expected_sig = hmac.new(
            secret.encode('utf-8'),
            unsigned_token.encode('utf-8'),
            hashlib.sha256
        ).digest()
        
        actual_sig = base64url_decode(crypto_segment)
        
        if not hmac.compare_digest(expected_sig, actual_sig):
            return None
            
        payload = json.loads(base64url_decode(payload_segment).decode('utf-8'))
        
        # Check expiry
        if 'exp' in payload and payload['exp'] < time.time():
            return None
            
        return payload
    except Exception:
        return None
