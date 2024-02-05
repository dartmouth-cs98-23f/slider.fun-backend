import { Router } from 'express';
import * as UserPuzzleData from '../controllers/user_puzzle_data_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our User Puzzle Data router!' });
});

// CREATE NEW USER PUZZLE DATA
router.post('/new', async (req, res) => {
    try {
      const result = await UserPuzzleData.createUserPuzzleData(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET All USER PUZZLE DATA
router.get('/all', async (req, res) => {
    try {
      const result = await UserPuzzleData.getAllPuzzleData();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// GET USER PUZZLE DATA BY ID
router.get('/:id', async (req, res) => {
    try {
      const result = await UserPuzzleData.getPuzzleData(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// UPDATE USER PUZZLE DATA
router.put('/:id', async (req, res) => {
    try {
      const result = await UserPuzzleData.updatePuzzleData(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});

// DELETE USER PUZZLE DATA
router.delete('/:id', async (req, res) => {
    try {
      const result = await UserPuzzleData.deletePuzzleData(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});


export default router;