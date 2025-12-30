import express from "express";
import { loginUser, registerUsers } from "../controllers/authControllers.js";
import {
  validateRegistration,
  validateLoginInfo,
} from "../middleware/authValidate.js";
import rateLimit from "express-rate-limit";

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
});

const router = express.Router();

router.post("/login", validateLoginInfo, loginLimit, loginUser);
router.post("/register", validateRegistration, registerUsers);

export default router;
