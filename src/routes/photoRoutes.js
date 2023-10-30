import { Router } from 'express';
import * as Photo from '../controllers/photo_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our photo router!' });
});

router.post('/new', async (req, res) => {
    try {
        const result = await Photo.createPhoto(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/all', async (req, res) => {
    try {
        const result = await Photo.getAllPhotos();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const result = await Photo.updatePhoto(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Photo.getPhotoById(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Photo.deletePhoto(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default router;