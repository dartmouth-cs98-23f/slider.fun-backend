import { Router } from 'express';
import * as Photo from '../controllers/photo_properties_controller.js';

const router = Router();


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our photo properties router!' });
});

// UPDATE PHOTO PROPERTIES INFO
router.put('/updatePhotoProperties', async (req, res) => {
    try {
      const result = await Photo.updatePhotoProperties(req.params.id, req.body);
      res.json(result);

    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET PHOTO PROPERTIES INFO
router.get('/photoPropertiesInfo/:id', async (req, res) => {
  try {
    const result = await Photo.getPhotoProperties(req.params.id, req.body);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE PHOTO PROPERTIES INFO
router.delete('/photoPropertiesInfo/:id', async (req, res) => {
  try {
    const result = await Photo.deletePhotoProperties(req.params.id);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;