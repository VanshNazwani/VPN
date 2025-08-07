import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import db from '../config/firebase.admin.js'; // Import Firestore instance

const MAIL_SERVER_COLLECTION = 'mail_server';

/**
 * Create a new mail server entry
 */
export const createMailServer = async (data) => {
  try {
    const newMailServer = {
      server_name: data.server_name,
      server_ip: data.server_ip,
      username: data.username,
      password: data.password,
      from_email: data.from_email,
      port: data.port,
      encryption: data.encryption,     // 'ssl' or 'tls'
      live_status: data.live_status || 1, // default: 1
      status: data.status || 2,        // default: 2
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, MAIL_SERVER_COLLECTION), newMailServer);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating mail server:', error);
    throw error;
  }
};

/**
 * Get active mail server (status: 2)
 */
export const getActiveMailServer = async () => {
  try {
    const q = query(
      collection(db, MAIL_SERVER_COLLECTION),
      where("status", "==", 2)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching active mail server:', error);
    return null;
  }
};
