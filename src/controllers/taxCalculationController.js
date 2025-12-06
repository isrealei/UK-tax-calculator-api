import express from "express";
import {
  saveUserDate,
  saveCalculatedTakeHome,
} from "../models/taxCalcModels.js";
import { taxCalculations } from "../../utils/taxCalc.js";

const taxCalc = async (req, res) => {
  const { job_title, county, salary_input, salary_period } = req.body;

  const result = await saveUserDate(
    job_title,
    county,
    salary_input,
    salary_period
  );

  const annualSalary = result.data[0].salary_input;
  const calculations = taxCalculations(annualSalary);
  const {
    personalAllowance,
    taxableIncome,
    taxOwed,
    niOwed,
    totalDeduction,
    takeHome,
  } = calculations;

  await saveCalculatedTakeHome(result.data[0].id, taxOwed, niOwed, takeHome);

  res.json({
    message: "Data saved successfully",
    taxOwed: taxOwed.toFixed(2),
    personalAllowance: personalAllowance,
    taxableIncome: taxableIncome.toFixed(2),
    annualSalary: annualSalary,
    niOwed: niOwed.toFixed(2),
    totalDeduction: totalDeduction.toFixed(2),
    takeHome: takeHome.toFixed(2),
  });
};

export default taxCalc;
