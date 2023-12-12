import { players, games, categories } from '../mocks/mock-data';
import { validationResult, body } from 'express-validator';

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username in players && players[username].password === password) {
    const player = Object.assign({}, players[username]); //Creating a copy of player
    delete player.password;
    res.status(201).json({
      status: 'success',
      player,
    });
  } else {
    res.status(400).json({
      status: 'fail',
      error: 'Player does not exist or wrong password!',
    });
  }
};

const logout = [
  body('username').notEmpty().withMessage('Username is required!'),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;

    if (username in players) {
      res.status(201).json({
        status: 'success',
      });
    } else {
      res.status(400).json({
        status: 'fail',
        error: 'Username does not match!',
      });
    }
  },
];

const getGames = (req, res) => {
  res.status(200).json(games);
};

const getCategories = (req, res) => {
  res.status(200).json(categories);
};

export default {
  login,
  logout,
  getGames,
  getCategories,
};
