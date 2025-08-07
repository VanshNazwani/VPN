import { createMailServer, getActiveMailServer } from '../models/mail.server.model.js';

// To insert
export const addMailServerHandler = async (req, res) => {
  try {
    const data = req.body;  // assume validated input
    const result = await createMailServer(data);
    res.json({ success: true, id: result.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// To get active server
export const getActiveMailServerHandler = async (req, res) => {
  try {
    const server = await getActiveMailServer();
    res.json({ success: true, data: server });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
