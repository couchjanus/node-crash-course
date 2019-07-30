// routes/web.js
import express from 'express';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const router = new express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
  
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/about.html'));
});

router.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/contact.html'));
});

router.get('/errors', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/errors.html'));
});


export default router;
