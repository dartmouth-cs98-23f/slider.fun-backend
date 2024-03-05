import { Router } from 'express';
import * as Users from '../controllers/user_controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user router!' });
});

// SING USER IN
router.post('/signin', async (req, res) => {
  try {
    const token = await Users.signin(req.body);
    res.json({ token, email: req.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// GET USER FROM TOKEN
router.get('/me', async (req, res) => {
  try {
    // Assuming Bearer token
    const token = req.headers.authorization.split(' ')[1];
    const user = await Users.getUserFromToken(token);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// CREATE NEW USER
router.post('/new', async (req, res) => {
  try {
    const token = await Users.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// GET ALL USERS
router.get('/all', async (req, res) => {
  try {
    const result = await Users.getUsers();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET TOP 25 USERS
router.get('/top25', async (req, res) => {
  try {
    const result = await Users.getTop25();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET USERNAME FROM GIVEN ID
router.get('/username/:id', async (req, res) => {
  try {
    const result = await Users.getUserName(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET USER FOR GIVEN ID
router.get('/:id', async (req, res) => {
  try {
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD AN ACHIEVEMENT TO THE GIVEN USER
router.put('/addAchievement/:id', async (req, res) => {
  try {
    const result = await Users.addAchievement(req.params.id, req.body.achievementName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD A PHOTO OBJECT TO THE GIVEN USER
router.put('/addPhoto/:id', async (req, res) => {
  try {
    await Users.addPhoto(req.params.id, req.body.photoId);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// REMOVE A PHOTO OBJECT FROM THE GIVEN USER
router.put('/removePhoto/:id', async (req, res) => {
  try {
    await Users.removePhoto(req.params.id, req.body.photoId);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD A USERPUZZLEDATA TO THE GIVEN USER
router.put('/addPuzzleData/:id', async (req, res) => {
  try {
    await Users.addPuzzleData(req.params.id, req.body.puzzleDataId);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// REMOVE A USERPUZZLEDATA FROM THE GIVEN USER
router.put('/removePuzzleData/:id', async (req, res) => {
  try {
    await Users.removePuzzleData(req.params.id, req.body.puzzleDataId);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE USER SCORE
router.put('/updateScore/:id', async (req, res) => {
  try {
    const result = await Users.updateSliderScore(req.params.id, req.body.count);  
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE DAILY PUZZLE STATUS
router.put('/completePuzzle/:id', async (req, res) => {
  try {
    const result = await Users.updateDailyPuzzleStatus(req.params.id);  
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE USER 
router.put('/:id', async (req, res) => {
  try {
    await Users.updateUser(req.params.id, req.body);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE USER WITH GIVEN ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Users.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
