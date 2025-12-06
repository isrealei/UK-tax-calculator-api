import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import taxCalculationRoutes from "./src/routes/taxCalculationRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/calculate", taxCalculationRoutes);
// app.use("/v1/calculations", calculationsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
