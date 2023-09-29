const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
    const { link } = req.body;
    console.log(link);
  
    const pyProg = spawn("python", ["./youtubeSum.py", link]);
  
    let resultData = "";
  
    pyProg.stdout.on("data", (data) => {
      resultData += data.toString();
    });
  
    pyProg.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      res.json({ result: resultData });
    });
  
    pyProg.on("error", (err) => {
      console.error(`Error in child process: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
  });

const PORT = 4000;
app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));
