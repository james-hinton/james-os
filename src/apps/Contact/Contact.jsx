import { useRef, useState } from "react";
import emailjs from "emailjs-com";

import "./Contact.scss";

const Contact = ({ appRef }) => {
  const [message, setMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const textAreaRef = useRef(null);

  const validateMessage = (msg) => {
    if (msg.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateMessage(message)) {
      return;
    }

    setMessageToSend(message);

    // Add user message
    setSentMessages((sentMessages) => [
      ...sentMessages,
      { type: "user", text: message },
    ]);

    // Wait 1 second
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    // Simulate bot response after a delay
    setTimeout(() => {
      setSentMessages((sentMessages) => [
        ...sentMessages,
        {
          type: "bot",
          text: "Thanks for your message, do you want to send this message as an email?",
        },
      ]);
      setIsTyping(false);
    }, 3000);

    setMessage("");
  };

  // Listen for enter key pressed when textarea is focused
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendEmail(e);
      e.target.value = "";
    }
  };

  const confirmSendEmail = () => {
    // Add a bot message saying sending email
    setSentMessages((sentMessages) => [
      ...sentMessages,
      { type: "bot", text: "Sending email..." },
    ]);

    try {
      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          {
            message: messageToSend,
          },
          import.meta.env.VITE_EMAIL_USER_ID
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            // Overwrite last bot message with success message
            setSentMessages((sentMessages) => [
              ...sentMessages.slice(0, -1),
              { type: "bot", text: "Email sent successfully." },
            ]);
          },
          (err) => {
            console.log("FAILED...", err);
            setSentMessages((sentMessages) => [
              ...sentMessages.slice(0, -1),
              { type: "bot", text: "Email failed to send." },
            ]);
          }
        );
    } catch (err) {
      console.log(err);

      setSentMessages((sentMessages) => [
        ...sentMessages.slice(0, -1),
        { type: "bot", text: "Email failed to send." },
      ]);
    }
  };

  return (
    <div className="contact-container interactable">
      <div className="messages">
        {sentMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
            <br />
            {msg.text ===
              "Thanks for your message, do you want to send this message as an email?" && (
              <button
                onClick={(e) => {
                  confirmSendEmail();
                  e.target.style.display = "none";
                }}
                className="confirm-button"
              >
                Yes, send email
              </button>
            )}
          </div>
        ))}
        {isTyping && <div className="message typing">Typing...</div>}
      </div>
      <form onSubmit={sendEmail}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here"
          ref={textAreaRef}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
