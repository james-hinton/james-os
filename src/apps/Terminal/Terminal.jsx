import { useState, useRef, useEffect } from "react";
import "./Terminal.scss";
import commandData from "./commands.json";

const Terminal = ({ appRef }) => {
  const [commands, setCommands] = useState([]);
  const [currentDir, setCurrentDir] = useState("/");
  const [fileSystem, setFileSystem] = useState({
    "/": {
      "readme.txt":
        "Welcome to James Hinton's Portfolio Terminal! Explore directories or type 'help' for commands.",
      projects: {
        professional: {
          "commonsensing.txt":
            "Principal developer for a £9.6 million project enhancing climate resilience in the Pacific Islands. Technologies: Python, JavaScript, Kubernetes.",
          "ordnance_survey.txt":
            "Enhanced Spatio-Temporal Asset Catalog software using GDAL, Rasterio, and PDAL. Frontend mapping with Leaflet.",
          "yeti.txt":
            "Contributor to the Yemen Economic Tracking Initiative platform. Skills: Django, JQuery, AWS.",
          "city_explorer_toolkit.txt":
            "Upgrading the City Explorer Toolkit to a robust build with Azure, React, Django.",
          "whoovr.txt":
            "Sole Software Developer for a company information web service. Full stack development with Python Flask and JavaScript.",
          "requiem.txt":
            "Developed the Requiem Cemetery Management System. Involved in full lifecycle from design to deployment.",
        },
        personal: {
          "mandarin_translator.txt":
            "React-based translation tool for Mandarin Chinese, using APIs, databases, and AWS S3 for audio storage.",
          "ecosystem_game.txt":
            "C# Unity project simulating a 3D ecosystem with AI-driven animal behaviors.",
          "music_prediction.txt":
            "Deep Learning project for music prediction, employing neural networks for classification and regression.",
        },
      },
      skills: {
        "programming_languages.txt":
          "Expertise in JavaScript, Python, C#, and various related technologies like Django, Flask, and React.",
      },
      education: {
        "msc_computing.txt":
          "Master of Science in Computing from Cardiff University with Distinction.",
        "ba_business.txt":
          "Bachelor of Arts in Business (Team Entrepreneurship) from University of the West of England.",
      },
      hobbies: {
        "guitar.txt":
          "Passionate guitarist, participated in bands, and won a local battle of the bands.",
        "chess.txt":
          "Active in online chess tournaments with an ELO rating of 1500.",
        "rugby.txt": "Rugby enthusiast, attended three grand-slam matches.",
        "mandarin_learning.txt":
          "Self-taught Mandarin speaker, approximately HSK2/3 level.",
        "ctf_challenges.txt":
          "Engaged in Capture The Flag challenges and local penetration testing with Docker.",
        "ai_ml_experiments.txt":
          "Experimenting with public AI models using an RTX3060.",
      },
    },
    commands: {
      "help.txt":
        "Explore with 'ls', 'cat', 'cd', 'date', 'clear'. Custom commands: 'about', 'contact'.",
    },
  });
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
        setCommands([]);
        setTimeout(() => {
          setCommands([]);
          setShowWelcomeMessage(false);
        }, 50);
        return;
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
      current = current[part];
      if (!current) return "Directory not found: " + part;
    }

    // Make sure newPath isnt like ////// so check for multiple slashes
    if (newPath.match(/\/{2,}/)) newPath = '/'
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
      return {
        name: item,
        isDirectory: typeof current[item] === "object",
      };
    });

    // Generate the display for each item
    return items.length
      ? items.map((item) => {
          return (
            <span className={item.isDirectory ? "directory" : "file"}>
              {item.name}
            </span>
          );
        })
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

      setCommands([...commands, { command: input, response, dir: currentDir }]);
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
  }, []);

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

          <div className="response">{cmd.response}</div>
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
