import React from "react";
import DailyTracker from "./DailyTracker";

function App() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🕒 Daily Tracker</h1>
      <DailyTracker />
    </div>
  );
}

export default App;
