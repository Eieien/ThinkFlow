import express from "express";
import cookieParser from "cookie-parser";

import { dbConnect } from "./config/mongoConfig.js";
import routes from "./routes/router.js";

dbConnect();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})