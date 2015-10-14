import express from 'express';
const router = express.Router();
import startPageController from '../controllers/startPageController';

router.get('/', startPageController.index);

module.exports = router;