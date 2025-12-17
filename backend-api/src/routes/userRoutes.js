import express from "express";
import { getUserProfile } from "../controllers/getUserProfile.js";
import { authJwtMiddleWare } from "../middleware/authValidate.js";
const router = express.Router();

router.get("/", authJwtMiddleWare, getUserProfile);

export default router;
