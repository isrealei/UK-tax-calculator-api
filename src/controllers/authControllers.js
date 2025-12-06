import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { registerUser, checkForUserEmail } from "../models/authModel.js";

export const registerUsers = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    // check if email exits in the database
    const existing = await checkForUserEmail(email);
    console.log(existing);
    if (existing.data) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const user = await registerUser(email, password, firstName, lastName);
    const token = jwt.sign(
      { id: user.data.id, email: user.data.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ success: true, data: user, token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await checkForUserEmail(email);
    if (!userData.data) {
      return res.status(401).json({
        success: false,
        message: "Email does not exist",
      });
    }
    const hashPassword = userData.data.password;
    const isPasswordMatch = await bcrypt.compare(password, hashPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Once users are logged in generate a jwt token for subsequent communication for protected routes
    const token = jwt.sign(
      { id: userData.data.id, email: userData.data.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      msg: "login successfull",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
