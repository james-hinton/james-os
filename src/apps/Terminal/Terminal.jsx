import { useState } from "react";
import "./Terminal.scss";
import commandData from "./commands.json";

const Terminal = () => {
  const [commands, setCommands] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let command = event.target.value;

      if (!command) return;

      // Process the command
      let response =
        commandData[command.split(" ")[0].toLowerCase()] || `Command not found: ${command}`;

      // Handle special cases
      if (command.toLowerCase() === "date") {
        response = new Date().toLocaleString();
      } else if (command.toLowerCase() === "clear") {
        setCommands([]);
        event.target.value = "";
        return;
      }

      setCommands([...commands, { command, response }]);
      event.target.value = "";
    }
  };

  return (
    <div
      className="terminal interactable"
      onClick={(event) => {
        event.target.querySelector(".terminal-input").focus();
      }}
    >
      {commands.map((cmd, index) => (
        <div key={index}>
          <span className="prompt">$</span> {cmd.command}
          <div className="response">{cmd.response}</div>
        </div>
      ))}
      <div className="input-line">
        <span className="prompt">$</span>
        <input
          type="text"
          onKeyPress={handleKeyPress}
          className="terminal-input interactable"
          
        />
      </div>
    </div>
  );
};

export default Terminal;
