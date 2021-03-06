const express = require("express");
const connetcDB = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

//Connect DB
connetcDB();

//Iint Middleware
app.use(express.json({extende : true}));

app.use(cors());

app.get("/",(req,res) => res.send("API Running"))

app.use("/api/users",require("./routes/api/users"));
app.use("/api/auth",require("./routes/api/auth"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/posts",require("./routes/api/posts"));


app.listen(PORT,() => console.log(`Server started on port ${PORT}`))