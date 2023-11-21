// components/Switch.js
import { useState } from "react";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
