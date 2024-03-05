import { Router } from 'express';
import * as Achievement from '../controllers/achievements_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our Achievement router!' });
});

// CREATE NEW ACHIEVEMENT
router.post('/new', async (req, res) => {
    try {
        const result = await Achievement.newAchievement(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error });
    }
});

// GET ALL ACHIEVEMENTS
router.get('/all', async (req, res) => {
    try {
        const result = await Achievement.getAchievements();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET ACHIEVEMENT BY NAME
router.get('/achievementByName', async (req, res) => {
    try {
        const result = await Achievement.getAchievementByName(req.body.name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET ACHIEVEMENT USER COUNT
router.get('/userCount', async (req, res) => {
    try {
        const result = await Achievement.getUserCount(req.body.name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET AN ACHIEVEMENT
router.get('/:id', async (req, res) => {
    try {
        const result = await Achievement.getAchievement(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// UPDATE AN ACHIEVEMENT
router.put('/:id', async (req, res) => {
    try {
        const result = await Achievement.updateAchievement(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// DELETE AN ACHIEVEMENT
router.delete('/:id', async (req, res) => {
    try {
        const result = await Achievement.deleteAchievement(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default router;