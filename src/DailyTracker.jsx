import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const tasks = [
  "Sleep 5 hrs",
  "Satsang",
  "Travel",
  "GOD 2 hrs",
  "Parents 2 hrs",
  "Freelance",
  "Krushna Web Works",
  "Trading 0.5 hr",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Free Time"
];

const getToday = () => new Date().toISOString().split("T")[0];

export default function DailyTracker() {
  const today = getToday();
  const [checked, setChecked] = useState(() => {
    const stored = localStorage.getItem(today);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(today, JSON.stringify(checked));
  }, [checked, today]);

  const handleCheck = (task) => {
    setChecked({ ...checked, [task]: !checked[task] });
  };

  const downloadData = () => {
    const data = {
      date: today,
      tasks: checked,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `daily_log_${today}.json`);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tasks for {today}</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task} className="flex items-center">
            <input
              type="checkbox"
              checked={!!checked[task]}
              onChange={() => handleCheck(task)}
              className="mr-2"
            />
            <label>{task}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={downloadData}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download Log
      </button>
    </div>
  );
}
