import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { findUser, createUser, findAndUpdateUser, findUserByEmail } from '../data.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
  let user = findUserByEmail(req.body.email);

  if (!user) {
    const userCreated = createUser({
      _id: Math.floor(100000000 + Math.random() * 800000000),
      name: req.body.email.split('@')[0],
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user = userCreated;
  }
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    }
  }
  return res.status(401).send({ message: 'Invalid user email or password' });
}));

userRouter.get('/:_id', expressAsyncHandler(async (req, res) => {
  const user = findUser(req.params._id);
  return res.status(200).send({ user });
}));

userRouter.put('/:_id', expressAsyncHandler(async (req, res) => {
  const user = findAndUpdateUser(req.body);
  user.token = generateToken(user);
  return res.status(200).send({ user });
}));


export default userRouter;
