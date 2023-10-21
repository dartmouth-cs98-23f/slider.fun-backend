import { Router } from 'express';
import * as Game from '../controllers/game_page_controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to our game page router!' });
});

router.put('/updatePageInfo', async (req, res) => {
    try {
      const result = await Game.updateGamePage(req.params.id, req.body);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
});



export default router;