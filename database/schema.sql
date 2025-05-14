CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    SKU NVARCHAR(50),
    Stock INT,
    ReorderLevel INT
);

CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY,
    ProductId INT,
    Quantity INT,
    OrderDate DATETIME,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
