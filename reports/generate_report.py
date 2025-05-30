import os
import pandas as pd
import requests

api_base = os.getenv("API_BASE_URL", "http://localhost:5204")
url = f"{api_base.rstrip('/')}/api/products"

response = requests.get(url, timeout=10)
response.raise_for_status()

products = response.json()
df = pd.DataFrame(products)[["name", "sku", "stock"]]
df.to_csv("inventory_report.csv", index=False)

print("Report generated: inventory_report.csv")
