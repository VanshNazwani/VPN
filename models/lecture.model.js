// firestore/models/lecture.model.js

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../config/firebase.admin.js"; // Firestore db instance

const LECTURES_COLLECTION = "lectures";

// Create a new lecture document
export const createLecture = async (lectureData) => {
  const {
    title,
    description = "",
    videoUrl,
    youtubeId,
    category = "",
    duration = null,
    tags = [],
    createdBy, // Should be a string user ID
  } = lectureData;

  // Validate required fields
  if (!title || !videoUrl || !youtubeId || !createdBy) {
    throw new Error("Missing required fields");
  }

  const newLecture = {
    title: title.trim(),
    description,
    videoUrl,
    youtubeId,
    category,
    duration,
    tags,
    createdBy,               // Reference to User UID (not ref like in Mongoose)
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const lectureRef = await addDoc(collection(db, LECTURES_COLLECTION), newLecture);
  return lectureRef.id;
};
