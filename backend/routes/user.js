const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message, error: err });
  }
});

router.post('/', async (req, res) => {
  const user = new User({
    user: req.body.user,
    senha: req.body.senha
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!', data: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
  }
});

module.exports = router;
