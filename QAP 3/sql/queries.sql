-- sql/queries.sql

-- CREATE TABLE
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SELECT
SELECT * FROM items;

-- INSERT
INSERT INTO items (name, description, price) VALUES ('Item Name', 'Item Description', 10.99);

-- UPDATE
UPDATE items SET name = 'Updated Name', description = 'Updated Description', price = 12.99 WHERE id = 1;

-- DELETE
DELETE FROM items WHERE id = 1;
