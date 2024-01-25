import { useState, useRef, useEffect } from "react";

// Data
import commandData from "./commands.json";
import fileSystemData from "./fileSystem.json";

// Styles
import "./Terminal.scss";

const Terminal = ({ appRef }) => {
  const [commands, setCommands] = useState([]);
  const [currentDir, setCurrentDir] = useState("/");
  const [fileSystem, setFileSystem] = useState(fileSystemData);
  const [showUser, setShowUser] = useState(false);

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const handleCommand = (input) => {
    const args = input.split(" ");
    const command = args[0].toLowerCase();
    let response = commandData[command] || `Command not found: ${input}`;
    scrollToBottom();

    switch (command) {
      case "cd":
        response = handleCD(args[1]);
        break;
      case "ls":
      case "dir":
        response = handleLS();
        break;
      case "cat":
      case "nano":
      case "vim":
      case "vi":
        response = handleCAT(args[1]);
        break;
      case "date":
        response = new Date().toLocaleString();
        break;
      case "clear":
        console.log("Clearing terminal");
        setCommands([]);
        setShowWelcomeMessage(false);
        response = "";
        break;
    }

    return response;
  };

  const handleCD = (dir) => {
    if (!dir || dir === ".") return "";
    if (dir === "..") {
      if (currentDir === "/") return "";
      const path = currentDir.split("/").slice(0, -1).join("/") || "/";
      setCurrentDir(path);
      return "";
    }
  
    let newPath = currentDir === "/" ? `/${dir}` : `${currentDir}/${dir}`;
    const pathParts = newPath.split("/").filter(Boolean);
    let current = fileSystem["/"];
  
    for (const part of pathParts) {
      if (!current[part]) {
        return "Directory not found: " + part;
      }
  
      // Check if the path part is a directory (object)
      if (typeof current[part] === "object") {
        current = current[part];
      } else {
        return "Cannot cd into a file: " + part;
      }
    }
  
    // Make sure newPath isn't like ////// so check for multiple slashes
    if (newPath.match(/\/{2,}/)) newPath = "/";
    setCurrentDir(newPath);
    return "";
  };
  
  const handleLS = () => {
    // Split the current directory path into parts
    const pathParts = currentDir.split("/").filter(Boolean);
  
    // Start from the root of the file system
    let current = fileSystem["/"];
  
    // Traverse the file system based on the current directory
    for (const part of pathParts) {
      current = current[part];
      if (!current) return "Directory not found: " + part;
    }
  
    // Extract the items in the current directory
    const items = Object.keys(current).map((item) => {
      return (
        <span
          key={item}
          className={typeof current[item] === "object" ? "directory" : "file"}
        >
          {item}
        </span>
      );
    });
  
    // Generate the display for each item
    return items.length
      ? <div>{items.reduce((prev, curr) => [prev, ' ', curr])}</div>
      : "No files in this directory";
  };
  

  const handleCAT = (fileName) => {
    const pathParts = currentDir.split("/").filter(Boolean);
    let current = fileSystem["/"];

    for (const part of pathParts) {
      current = current[part];
      if (!current) return "Directory not found: " + part;
    }

    const fileContent = current && current[fileName];
    return fileContent || "File not found: " + fileName;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let input = event.target.value;

      if (!input) return;

      let response = handleCommand(input);

      if (input === "clear") {
        setCommands([]);
      } else {
        setCommands([
          ...commands,
          { command: input, response, dir: currentDir },
        ]);
      }

      scrollToBottom();

      event.target.value = "";
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const autoCompleteDirectory = (partialDir) => {
    const pathParts = currentDir.split("/").filter(Boolean);
    let current = fileSystem["/"];

    for (const part of pathParts) {
      current = current[part];
      if (!current) return null;
    }

    const allNames = Object.keys(current);
    const matches = allNames.filter((name) => name.startsWith(partialDir));

    if (matches.length === 1) {
      const matchedDir = matches[0];
      return matchedDir;
    }

    return null;
  };

  useEffect(() => {
    const handleTabKeyPress = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const input = inputRef.current.value;
        const args = input.split(" ");
        const lastArg = args[args.length - 1];

        if (lastArg) {
          const autoCompleteResult = autoCompleteDirectory(lastArg);
          if (autoCompleteResult) {
            inputRef.current.value = input.replace(
              new RegExp(`${lastArg}$`),
              autoCompleteResult
            );
          }
        }
      }
    };

    inputRef.current.addEventListener("keydown", handleTabKeyPress);

    return () => {
      inputRef.current?.removeEventListener("keydown", handleTabKeyPress);
    };
  }, [currentDir]);

  const renderResponse = (response) => {
    if (Array.isArray(response)) {
      return response.map((line, index) => <div key={index}>{line}</div>);
    } else if (typeof response === 'string') {
      return response.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ));
    } else {
      // Handle other types (like React elements or numbers)
      return response;
    }
  };
  

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;
    const isMobile = appWidth < 800;
    setShowUser(isMobile ? false : true);
  }, [appRef?.current?.offsetWidth]);

  return (
    <div
      className="terminal interactable"
      onClick={(event) => {
        event.stopPropagation();
        inputRef.current.focus();
      }}
      ref={terminalRef}
    >
      {showWelcomeMessage && (
        <div className="welcome-message">
          <div className="response">
            Welcome to James Hinton's Portfolio Terminal! Explore directories or
            type 'help' for commands.
          </div>
        </div>
      )}
      {commands.map((cmd, index) => (
        <div key={`command-${index}`}>
          <span className="prompt">
            {showUser && (
              <>
                <span className="user">guest@james-hinton.com</span>
                <span className="colon">:</span>
              </>
            )}
            <span className="dir">{cmd.dir}</span>
            <span className="dollar">$</span>
            <span className="command">{cmd.command}</span>
          </span>

          <div className="response">
            {renderResponse(cmd.response)}
          </div>
        </div>
      ))}
      <div className="input-line">
        <span className="prompt">
          {showUser && (
            <>
              <span className="user">guest@james-hinton.com</span>
              <span className="colon">:</span>
            </>
          )}
          <span className="dir">{currentDir}</span>
          <span className="dollar">$</span>
        </span>

        <input
          type="text"
          onKeyPress={handleKeyPress}
          className="terminal-input interactable command"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Terminal;
