const express = require('express');
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');
const FilesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', AppController.status);

router.get('/stats', AppController.stats);

router.post('/users', UsersController.users);

router.get('/connect', AuthController.connect);

router.get('/disconnect', AuthController.disconnect);

router.get('/users/me', UsersController.userMe);

router.post('/files', FilesController.postUpload);

router.get('/files/:id', FilesController.getShow);

router.get('/files', FilesController.getIndex);

router.put('/files/:id/publish', FilesController.putPublish);

router.put('/files/:id/unpublish', FilesController.putUnpublish);

router.get('/files/:id/data', FilesController.getFile);

module.exports = router;
