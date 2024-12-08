const express = require('express');
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');
// const FilesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', AppController.status);

router.get('/stats', AppController.stats);

router.post('/users', UsersController.users);

router.get('/connect', AuthController.connect);

router.get('/disconnect', AuthController.disconnect);

router.get('/users/me', UsersController.userMe);

module.exports = router;
