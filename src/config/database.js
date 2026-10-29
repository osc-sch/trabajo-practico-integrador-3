import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // await mongoose.connection.dropDatabase();

    console.log("Conexion exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};
