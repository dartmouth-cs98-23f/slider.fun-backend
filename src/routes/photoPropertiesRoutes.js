import { Router } from 'express';
import * as Photo from '../controllers/photo_properties_controller.js';

const router = Router();


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our photo properties router!' });
});

// CREATE NEW PHOTO PROPERTIES
router.post('/new', async (req, res) => {
  try {
    const result = await Photo.initializePhotoProperties(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL PHOTO PROPERTIES
router.get('/all', async (req, res) => {
  try {
    const result = await Photo.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE PHOTO PROPERTIES INFO
router.put('/:id', async (req, res) => {
    try {
      const result = await Photo.updatePhotoProperties(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET PHOTO PROPERTIES INFO
router.get('/:id', async (req, res) => {
  try {
    const result = await Photo.getPhotoProperties(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE PHOTO PROPERTIES INFO
router.delete('/:id', async (req, res) => {
  try {
    const result = await Photo.deletePhotoProperties(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;