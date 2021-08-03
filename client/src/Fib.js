import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = useCallback(async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  }, []);

  const fetchIndexes = useCallback(async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For Index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
