import { Router } from 'express';
import * as Level from '../controllers/level_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our level router!' });
});


// CREATE NEW LEVEL
router.post('/level/new', async (req, res) => {
    try {
      const result = await Level.createLevel(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// UPDATE LEVEL
router.put('/level/update', async (req, res) => {
    try {
      const result = await Level.updateLevel(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET LEVEL
router.get('/level/:id', async (req, res) => {
    try {
      const result = await Level.getLevel(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// DELETE LEVEL
router.delete('/level/:id', async (req, res) => {
    try {
      const result = await Level.deleteLevel(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

export default router;