const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const queues = {};

app.get("/api/queues", (req, res) => {
  const queueList = Object.keys(queues).map((queueName) => ({
    name: queueName,
    messageCount: queues[queueName].length,
  }));
  console.log(queueList);

  res.status(200).json(queueList);
});

app.post("/api/:queue_name", (req, res) => {
  const { queue_name } = req.params;
  const message = req.body;

  if (!message || Object.keys(message).length === 0) {
    return res.status(400).json({ error: "Message body is required" });
  }

  if (!queues[queue_name]) {
    queues[queue_name] = [];
  }

  queues[queue_name].push(message);
  res.status(200).json({ message: "Message added to queue" });
});

app.get("/api/:queue_name", (req, res) => {
  const { queue_name } = req.params;
  const timeout = parseInt(req.query.timeout) || 10000;

  if (!queues[queue_name] || queues[queue_name].length === 0) {
    return res.status(204).end();
  }

  const message = queues[queue_name].shift();

  setTimeout(() => {
    if (message) {
      return res.status(200).json(message);
    }
  }, timeout);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
