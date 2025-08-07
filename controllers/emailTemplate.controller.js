// controllers/emailTemplate.controller.js

import {
  createEmailTemplate,
  getAllEmailTemplates,
  getTemplateByType,
  updateTemplateByType,
  deleteTemplateByType,
} from '../models/emailTemplates.model.js';

// POST /email
export const createTemplate = async (req, res) => {
  try {
    const created = await createEmailTemplate(req.body);
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error("Create Template Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// GET /email
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await getAllEmailTemplates();
    return res.status(200).json({ success: true, data: templates });
  } catch (err) {
    console.error("Get All Templates Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// GET /email/:key
export const getTemplateByKey = async (req, res) => {
  try {
    const template = await getTemplateByType(req.params.key);
    if (!template) {
      return res.status(404).json({ success: false, error: "Template not found" });
    }
    return res.status(200).json({ success: true, data: template });
  } catch (err) {
    console.error("Get Template By Key Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /email/:key
export const updateTemplate = async (req, res) => {
  try {
    const updated = await updateTemplateByType(req.params.key, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Template not found" });
    }
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("Update Template Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /email/:key
export const deleteTemplate = async (req, res) => {
  try {
    const success = await deleteTemplateByType(req.params.key);
    if (!success) {
      return res.status(404).json({ success: false, error: "Template not found" });
    }
    return res.status(200).json({ success: true, message: "Template deleted" });
  } catch (err) {
    console.error("Delete Template Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
