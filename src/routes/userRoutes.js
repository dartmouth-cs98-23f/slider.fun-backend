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

// Create User
router.post('/new', async (req, res) => {
  try {
    const token = await Users.signup(req.body);
    console.log(token);
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
  console.log(req.body)
  try {
    await Users.updateUser(req.params.id, req.body);
    const result = await Users.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//  delete all users
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const result = await Users.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
