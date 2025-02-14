import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000");
    eventSource.onmessage = (event) => {
      console.log(event);
      setData((prevData) => [...prevData, event.data]);
    };
    eventSource.addEventListener("end", () => {
      console.log("Connection closed");
      eventSource.close();
    });
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <>
      <h1>Server-Sent Events</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
