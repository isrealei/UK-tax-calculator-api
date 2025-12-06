import express from "express";
import taxCalc from "../controllers/taxCalculationController.js";
import {
  validateTaxCalcInput,
  authJwtMiddleWare,
} from "../middleware/authValidate.js";

const router = express.Router();

router.post("/", authJwtMiddleWare, validateTaxCalcInput, taxCalc);

export default router;
