// models/emailTemplates.model.js

import db from "../config/firebase.admin.js"; // Firestore DB
import nodemailer from "nodemailer";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
 const { getActiveMailServer } = await import("../models/mail.server.model.js"); // Lazy import


const COLLECTION_NAME = "email_templates";

/** 🔧 Create a new email template */
export const createEmailTemplate = async (data) => {
  data.createdAt = serverTimestamp();
  data.updatedAt = serverTimestamp();
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return { id: docRef.id, ...data };
};

/** 📄 Get all email templates */
export const getAllEmailTemplates = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/** 🔍 Get a template by type (key) */
export const getTemplateByType = async (type) => {
  const q = query(collection(db, COLLECTION_NAME), where("type", "==", type), where("status", "==", true));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

/** 🛠️ Update a template by type */
export const updateTemplateByType = async (type, updates) => {
  const q = query(collection(db, COLLECTION_NAME), where("type", "==", type));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const docRef = snapshot.docs[0].ref;
  updates.updatedAt = serverTimestamp();
  await updateDoc(docRef, updates);
  const updatedDoc = await getDoc(docRef);
  return { id: docRef.id, ...updatedDoc.data() };
};

/** ❌ Delete a template by type */
export const deleteTemplateByType = async (type) => {
  const q = query(collection(db, COLLECTION_NAME), where("type", "==", type));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return false;

  const docRef = snapshot.docs[0].ref;
  await deleteDoc(docRef);
  return true;
};

/** 🧩 Replace placeholders with values */
export const parseTemplate = (template, variables = {}) => {
  return Object.keys(variables).reduce((result, key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    return result.replace(regex, variables[key]);
  }, template);
};

/** 📩 Send an email using Firestore-stored template */
export const sendMail = async (emailData) => {
  try {
    const mailServer = await getActiveMailServer();

    if (!mailServer) {
      console.error("❌ No active mail server found.");
      return;
    }

    const template = await getTemplateByType(emailData.templateType);
    if (!template) {
      console.error(`❌ No active template found for type: "${emailData.templateType}"`);
      return;
    }

    const tos = emailData.to;
    if (!tos) {
      console.error("❌ No recipient email address provided.");
      return;
    }

    const subject = template.subject;
    const body = parseTemplate(template.msg_body, emailData.variables || {});

    let secure = false;
    let requireTLS = false;

    if (mailServer.encryption === "ssl" || mailServer.encryption === 2) {
      secure = true;
    } else if (mailServer.encryption === "tls" || mailServer.encryption === 1) {
      requireTLS = true;
    }

    const transporter = nodemailer.createTransport({
      host: mailServer.server_ip,
      port: mailServer.port,
      secure,
      requireTLS,
      auth: {
        user: mailServer.username,
        pass: mailServer.password,
      },
    });

    await transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Mail server verification failed:", error);
      } else {
        console.log("✅ Mail server is ready:", success);
      }
    });

    const mailOptions = {
      from: `"${mailServer.sender_name || "No-Reply"}" <${mailServer.from_email}>`,
      to: tos,
      subject,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully. Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    console.error(error.stack);
    throw error;
  }
};
