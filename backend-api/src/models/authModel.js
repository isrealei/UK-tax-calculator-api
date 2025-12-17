import { supabase } from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (email, password, firstName, lastName) => {
  // Hash the password properly before storing it in the database
  const hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hash,
        first_name: firstName,
        last_name: lastName,
      },
    ])
    .select();

  if (error) throw error;
  return data[0]; // return actual user record
};

export const checkForUserEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
};
