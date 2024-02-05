import { Router } from 'express';
import * as DailyPuzzle from '../controllers/daily_puzzle_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Daily Puzzle router!' });
});

// CREATE NEW DAILY PUZZLE
router.post('/new', async (req, res) => {
    try {
      const result = await DailyPuzzle.createDailyPuzzle(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});



// GET All DAILY PUZZLES
router.get('/all', async (req, res) => {
    try {
      const result = await DailyPuzzle.getAllDailyPuzzles();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


// GET DAILY PUZZLE BY DATE
router.get('/byDate', async (req, res) => {
  try {
    const result = await DailyPuzzle.getDailyPuzzleByDate(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET DAILY PUZZLE BY ID
router.get('/:id', async (req, res) => {
    try {
      const result = await DailyPuzzle.getDailyPuzzleByID(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


// UPDATE DAILY PUZZLE
router.put('/:id', async (req, res) => {
    try {
      const result = await DailyPuzzle.updateDailyPuzzle(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// DELETE DAILY PUZZLE
router.delete('/:id', async (req, res) => {
    try {
      const result = await DailyPuzzle.deleteDailyPuzzle(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


export default router;