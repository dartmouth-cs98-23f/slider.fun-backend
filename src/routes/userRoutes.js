import { Router } from 'express';
import * as Users from '../controllers/user_controller.js';
// import { requireSignin } from '../services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our user router!' });
});

router.post('/signin', async (req, res) => {
  try {
    const token = await Users.signin(req.body);
    res.json({ token, email: req.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// get user from token
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


// Create User
router.post('/new', async (req, res) => {
  try {
    const token = await Users.signup(req.body);
    res.json({ token, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

// Get all users
router.get('/all', async (req, res) => {
  try {
    const result = await Users.getUsers();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Users.updateUser(req.params.id, req.body);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/addPuzzleData/:id', async (req, res) => {
  try {
    await Users.addPuzzleData(req.params.id, req.body.puzzleDataId);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//  delete user by id

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
