import { Router } from 'express';
import * as Photo from '../controllers/photo_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our photo router!' });
});

// CREATE NEW PHOTO
router.post('/new', async (req, res) => {
    try {
        const result = await Photo.createPhoto(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error });
    }
});

// GET ALL PHOTOS
router.get('/all', async (req, res) => {
    try {
        const result = await Photo.getAllPhotos();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ADD A PROPERTY TO A PHOTO'S PROPERTIES LIST
router.put('/addProperty/:id', async (req, res) => {
    try {
        const result = await Photo.addProperty(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// REMOVE A PROPERTY FROM A PHOTO'S PROPERTIES LIST
router.delete('/removeProperty/:id', async (req, res) => {
    try {
        const result = await Photo.removeProperty(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// INCREASE PHOTO LIKE COUNT BY 1 
router.put('/addLike/:id', async (req, res) => {
    try {
        const result = await Photo.addLike(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// DECREASE PHOTO LIKE COUNT BY 1 
router.put('/removeLike/:id', async (req, res) => {
    try {
        const result = await Photo.removeLike(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// UPDATE A PHOTO FIELD
router.put('/:id', async (req, res) => {
    try {
        const result = await Photo.updatePhoto(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET A PHOTO BY ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Photo.getPhotoById(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// DELETE A PHOTO BY ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Photo.deletePhoto(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default router;