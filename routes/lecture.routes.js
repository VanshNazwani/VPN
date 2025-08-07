
import express from 'express';
import * as LecturesCtrl from '../controllers/lecture.controller.js';
import { authenticate } from '../middleweare/auth.middleware.js';

const router = express.Router();

// All lecture routes require valid token
router.use(authenticate);

router.post('/lecture',  LecturesCtrl.createLecture);
router.get('/lecture',      LecturesCtrl.getAllLectures);
router.get('/lecture:id',   LecturesCtrl.getLectureById);
router.put('/lecture:id',   LecturesCtrl.updateLecture);
router.delete('/lecture:id',LecturesCtrl.deleteLecture);

export default router;
