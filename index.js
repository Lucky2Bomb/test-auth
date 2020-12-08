const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect(`YOUR MONGODB URL`);
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();