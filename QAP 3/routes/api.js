const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await db.query('SELECT * FROM items');
        res.json(items.rows);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Server Error');
    }
});

// Get single item
router.get('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (item.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.json(item.rows[0]);
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).send('Server Error');
    }
});

// Create item
router.post('/items', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).send('All fields are required');
        }
        const newItem = await db.query('INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *', [name, description, price]);
        res.json(newItem.rows[0]);
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).send('Server Error');
    }
});

// Update item
router.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const updatedItem = await db.query('UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [name, description, price, id]);
        if (updatedItem.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.json(updatedItem.rows[0]);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).send('Server Error');
    }
});

// Delete item
router.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        if (deletedItem.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.json({ message: 'Item deleted' });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
