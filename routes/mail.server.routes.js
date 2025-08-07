import express from 'express';
import {
  addMailServerHandler,
  getActiveMailServerHandler
} from '../controllers/maile.server.controller.js';

const router = express.Router();

// POST: Add new mail server
router.post('/add-mail-server', addMailServerHandler);

// GET: Get active mail server
router.get('/all-mail-server', getActiveMailServerHandler);

export default router;
