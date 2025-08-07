// models/UserModel.js
import { v4 as uuidv4 } from 'uuid';

export class UserModel {
  constructor({ name, email, password, role = 'student', ip, resetPasswordToken = null, resetPasswordExpires = null }) {
    this.userId = uuidv4(); // Like Mongo _id
    this.name = name?.trim();
    this.email = email?.toLowerCase();
    this.password_hash = password; // hash before passing
    this.role = role;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpires = resetPasswordExpires;
    this.ip = ip;
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }
}
