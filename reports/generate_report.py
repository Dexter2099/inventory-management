import os
import pyodbc
import pandas as pd

conn_str = os.getenv(
    "DB_CONNECTION_STRING",
    'DRIVER={SQL Server};SERVER=localhost;DATABASE=InventoryDb;Trusted_Connection=yes;'
)
conn = pyodbc.connect(conn_str)

query = "SELECT Name, SKU, Stock FROM Products"
df = pd.read_sql(query, conn)
df.to_csv("inventory_report.csv", index=False)

print("Report generated: inventory_report.csv")
