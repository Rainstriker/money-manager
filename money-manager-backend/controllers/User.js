require('dotenv').config();
const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserById = async (req, res) => {
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    res.status(200).send(targetUser);
  }
  res.status(404).send();
}

const registerUser = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username }});
  if (targetUser) {
    res.status(400).send({ message: 'Username already taken.'})
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await db.User.create({
      username: username,
      password: hashedPassword,
      name: name
    });
    res.status(201).send({ message: 'User created' });
  }  
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } })
  if (!targetUser) {
    res.status(400).send({ message: 'Username or password is wrong.'});
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password);
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.name,
        id: targetUser.id
      }
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600});
      res.status(200).send({
        token: token,
        message: 'Login successful.'
      })
    } else {
      res.status(400).send({ message: 'Username or password is wrong.'})
    }
  }
}

const updateUserInfo = async (req, res) => {
  const { username, name } = req.body;
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    if (username) {
      targetUser.username = username;
    }
    if (name) {
      targetUser.name = name;
    }
    await targetUser.save({ fields: ['username', 'name'] });
    res.status(200).send({message: `Your profile has been updated.`});
  } else {
    res.status(404).send();
  }
  
  
}

const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    targetUser.password = hashedPassword;
    await targetUser.save({ fields: ['password'] });
    res.status(200).send({message: `Your password has been updated.`});
  } else {
    res.status(404).send();
  }
}

const deleteUser = async (req, res) => {
  await db.User.destroy(
    { where: { id: req.user.id } }
  );
  res.status(204).send();
}


module.exports = {
  getUserById,
  registerUser,
  loginUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser
}