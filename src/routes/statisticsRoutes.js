import { Router } from 'express';
import * as Stats from '../controllers/statistics_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Stats router!' });
});

// CREATE NEW STAT
router.post('/new', async (req, res) => {
    try {
      const result = await Stats.createStats(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET ALL STATS
router.get('/all', async (req, res) => {
    try {
      const result = await Stats.getAllStats();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// UPDATE THE MEANS OF A STAT
router.put('/:id', async (req, res) => {
    try {
      const result = await Stats.updateMeans(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET STAT BY ID
router.get('/:id', async (req, res) => {
    try {
      const result = await Stats.getStatById(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// DELETE A STAT
router.delete('/:id', async (req, res) => {
    try {
      const result = await Stats.deleteStat(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


export default router;