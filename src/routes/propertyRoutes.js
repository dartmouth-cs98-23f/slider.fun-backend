import { Router } from 'express';
import * as Property from '../controllers/property_controller.js';

const router = Router();


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Property router!' });
});

// CREATE NEW PROPERTY
router.post('/new', async (req, res) => {
    
  try {
    const result = await Property.initializePhotoProperty(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL  PROPERTIES
router.get('/all', async (req, res) => {
  try {
    const result = await Property.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;