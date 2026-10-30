import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { eventRouter } from "./src/routes/event.routes.js";
import { categoryRouter } from "./src/routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", categoryRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
