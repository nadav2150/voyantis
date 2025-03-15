import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "http://localhost:3000/api";

function App() {
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/queues`);
        setQueues(response.data);
      } catch (error) {
        console.error("Error fetching queues:", error);
      }
    };

    fetchQueues();
  }, []);

  const handleGoClick = async () => {
    if (!selectedQueue) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/${selectedQueue}?timeout=1000`
      );

      if (response.status === 200) {
        setMessage(response.data);

        setQueues((prevQueues) =>
          prevQueues.map((queue) =>
            queue.name === selectedQueue
              ? { ...queue, messageCount: queue.messageCount - 1 }
              : queue
          )
        );
      } else {
        setMessage(null);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Queue Manager</h1>
        <div className="queue-list">
          <h2 className="header-list">Available Queues</h2>
          <ul>
            {queues.map((queue, index) => (
              <li key={index}>
                <span>{queue.name}</span>
                <span>{queue.messageCount} Messages</span>
                <button
                  disabled={!queue.messageCount}
                  className={`${!queue.messageCount ? "button-disabled" : ""}`}
                  onClick={() => setSelectedQueue(queue.name)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="queue-action">
          {selectedQueue && !loading && (
            <>
              <h3 className="selected-queue">
                Selected Queue: {selectedQueue}
              </h3>
              <button onClick={handleGoClick}>Go</button>
            </>
          )}
          {loading && <p className="loading">Loading...</p>}
          {message && (
            <div className="message">
              <h4>Message from Queue:</h4>
              <pre>{JSON.stringify(message, null, 2)}</pre>
            </div>
          )}
          {message === null && !loading && (
            <p className="no-message">No message available</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
