// controllers/lecture.controller.js
import db from '../config/firebase.admin.js';
import { FieldValue } from 'firebase-admin/firestore';

// 🔧 Extract YouTube Video ID
const extractYouTubeId = url => {
  const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

// 📌 Create Lecture
export const createLecture = async (req, res) => {
  try {
    const { title, description = '', videoUrl, category = '', duration = null, tags = [] } = req.body;
    const youtubeId = extractYouTubeId(videoUrl);
    if (!youtubeId) return res.status(400).json({ error: 'Invalid YouTube URL' });

    const newLecture = {
      title,
      description,
      videoUrl,
      youtubeId,
      category,
      duration,
      tags,
      createdBy: req.user.userId, // Assume req.user is added via auth middleware
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('lectures').add(newLecture);
    const savedLecture = await docRef.get();
    res.status(201).json({ id: docRef.id, ...savedLecture.data() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get All Lectures
export const getAllLectures = async (req, res) => {
  try {
    const snapshot = await db.collection('lectures').get();
    const lectures = [];

    snapshot.forEach(doc => {
      lectures.push({ id: doc.id, ...doc.data() });
    });

    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get Single Lecture by ID
export const getLectureById = async (req, res) => {
  try {
    const doc = await db.collection('lectures').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found' });

    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update Lecture
export const updateLecture = async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: FieldValue.serverTimestamp() };

    if (update.videoUrl) {
      const youtubeId = extractYouTubeId(update.videoUrl);
      if (!youtubeId) return res.status(400).json({ error: 'Invalid YouTube URL' });
      update.youtubeId = youtubeId;
    }

    const docRef = db.collection('lectures').doc(req.params.id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) return res.status(404).json({ error: 'Not found' });

    await docRef.update(update);
    const updatedDoc = await docRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Delete Lecture
export const deleteLecture = async (req, res) => {
  try {
    const docRef = db.collection('lectures').doc(req.params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) return res.status(404).json({ error: 'Not found' });

    await docRef.delete();
    res.json({ message: 'Deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
