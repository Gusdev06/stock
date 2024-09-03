import { productRoutes } from "@/routes/product.routes";
import cors from "cors";
import express from "express";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json({
        timestamp: new Date(),
    });
});



app.use("/products", productRoutes);

export default app;