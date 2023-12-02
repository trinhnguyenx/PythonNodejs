const express = require('express');
const { spawn } = require('child_process');

require('dotenv').config();
const app = express();

const executePython = async (script, args) => {
  const arguments = args.map((arg) => arg.toString());
  const py = spawn('python', [script, ...arguments]);

  return new Promise((resolve, reject) => {
    let output;

    py.stdout.on('data', function (data) {
      output = JSON.parse(data);
    });

    py.stderr.on('data', (data) => {
      console.error(`[python] Error occurred ${data}`);
      reject(`error in ${script}`);
    });

    py.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(output);
    });
  });
};

app.get('/', async (req, res) => {
  try {
    const result = await executePython('python/main.py', [10, 5]);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
