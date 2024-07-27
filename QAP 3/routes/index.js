// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Show all items
router.get('/', async (req, res) => {
    try {
        const items = await db.query('SELECT * FROM items');
        res.render('index', { items: items.rows });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Server Error');
    }
});

// New item form
router.get('/new', (req, res) => {
    res.render('new');
});

// Create new item
router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).send('All fields are required');
        }
        await db.query('INSERT INTO items (name, description, price) VALUES ($1, $2, $3)', [name, description, price]);
        res.redirect('/');
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).send('Server Error');
    }
});

// Edit item form
router.get('/:id/edit', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid item ID');
        }
        const item = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (item.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.render('edit', { item: item.rows[0] });
    } catch (err) {
        console.error('Error fetching item for edit:', err);
        res.status(500).send('Server Error');
    }
});

// Show item
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid item ID');
        }
        const item = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (item.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        res.render('show', { item: item.rows[0] });
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).send('Server Error');
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid item ID');
        }
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).send('All fields are required');
        }
        await db.query('UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4', [name, description, price, id]);
        res.redirect(`/${id}`);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).send('Server Error');
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid item ID');
        }
        await db.query('DELETE FROM items WHERE id = $1', [id]);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
