import { Router } from 'express';
import * as Level from '../controllers/level_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our level router!' });
});


// CREATE NEW LEVEL
router.post('/new', async (req, res) => {
    try {
      const result = await Level.createLevel(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET All LEVELS
router.get('/all', async (req, res) => {
    try {
      const result = await Level.getAllLevels();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET LEVEL BY LEVEL NUMBER
router.get('/levelByNumber/:number', async (req, res) => {
    try {
      const result = await Level.getLevelByNumber(req.params.number);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// UPDATE LEVEL
router.put('/:id', async (req, res) => {
    try {
      const result = await Level.updateLevel(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET LEVEL
router.get('/:id', async (req, res) => {
    try {
      const result = await Level.getLevel(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


// DELETE LEVEL
router.delete('/:id', async (req, res) => {
    try {
      const result = await Level.deleteLevel(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


export default router;