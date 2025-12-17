import { supabase } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const saveUserDate = async (
  job_title,
  county,
  salary_input,
  salary_period
) => {
  const { data, error } = await supabase
    .from("user_inputs")
    .insert({
      job_title: job_title,
      county: county,
      salary_input: salary_input,
      salary_period: salary_period,
    })
    .select();
  if (error) {
    console.log("Error inserting data:", error);
    return { data: null, error };
  }
  return { data, error: null };
};

export const saveCalculatedTakeHome = async (
  user_input_id,
  income_tax,
  national_insurance,
  takeHome
) => {
  // Function implementation to save calculated take-home pay
  const { data, error } = await supabase.from("calculations").insert({
    user_input_id: user_input_id,
    income_tax: income_tax,
    national_insurance: national_insurance,
    take_home: takeHome,
  });
};
