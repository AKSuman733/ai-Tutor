import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/correct", {
      sentence: input,
    });

    setResult(res.data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI English Tutor</h1>

      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your sentence..."
      />

      <br /><br />

      <button onClick={handleSubmit}>Check</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Corrected:</b> {result.corrected}</p>
          <p><b>Explanation:</b> {result.explanation}</p>
          <p><b>Better:</b> {result.better}</p>
        </div>
      )}
    </div>
  );
}

export default App;