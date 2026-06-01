import requests

# 1. Login to get token
login_url = "http://127.0.0.1:8000/api/token/"
login_data = {"username": "admin", "password": "admin123"}
r = requests.post(login_url, json=login_data)
print("Login status:", r.status_code)
if r.status_code != 200:
    print("Login failed:", r.text)
    exit(1)
token = r.json().get("access")
print("Token:", token[:15] + "...")

# 2. Get category id
cat_url = "http://127.0.0.1:8000/api/categories/"
cats = requests.get(cat_url).json()
cat_id = cats[0]["id"]
print("Category ID:", cat_id)

# 3. Create dummy image
with open("test_img.png", "wb") as f:
    f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc`\x00\x00\x00\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82")

# 4. Create product with image file upload
prod_url = "http://127.0.0.1:8000/api/products/"
headers = {"Authorization": f"Bearer {token}"}
data = {
    "category": cat_id,
    "name": "Test Upload Product",
    "description": "This is a product created via file upload test.",
    "origin": "India",
    "quality_grade": "A Grade",
    "moq": "1 Metric Ton",
    "packaging_type": "Mesh Bags",
    "shelf_life": "30 Days",
    "base_price_inr": "50000.00",
    "price_unit": "Metric Ton",
    "primary_image_url": ""
}
files = {"primary_image": ("test_img.png", open("test_img.png", "rb"), "image/png")}

r = requests.post(prod_url, headers=headers, data=data, files=files)
print("Product Create Status:", r.status_code)
try:
    print("Product Create Response:", r.json())
except Exception as e:
    print("Product Create Text:", r.text)
