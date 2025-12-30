import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateRegistration = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("firstName is required for registeration"),
  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("lastName is required for registeration"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validateLoginInfo = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password field cannot be empty for login"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const authJwtMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
  next();
};

export const validateTaxCalcInput = [
  body("job_title").trim().notEmpty().withMessage("Job title is required"),

  body("county").trim().notEmpty().withMessage("County is required"),

  body("salary_input")
    .notEmpty()
    .withMessage("salary_input is required")
    .isNumeric()
    .withMessage("salary_input must be a number")
    .toFloat(),

  body("salary_period")
    .notEmpty()
    .withMessage("salary_period is required")
    .isIn(["annual", "monthly", "weekly", "daily"])
    .withMessage(
      "salary_period must be one of: annual, monthly, weekly, daily"
    ),

  // middleware to return any errors caught
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
