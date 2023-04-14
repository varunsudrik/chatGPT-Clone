import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState(null);
  //const [value, setValue] = useState(null);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [curentTitle, setCurentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurentTitle(null);
  };

  const handelClick = (uniqueTitle) => {
    setCurentTitle(uniqueTitle);
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:4000/completions",
        options
      );
      const data = await response.json();
      //console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(curentTitle, value, message);

    if (!curentTitle && value && message) {
      setCurentTitle(value);
    }
    if (curentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: curentTitle,
          role: "user",
          content: value,
        },
        {
          title: curentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, curentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === curentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );
  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="sidebar">
        <button onClick={createNewChat}> + New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li onClick={() => handelClick(uniqueTitle)} key={index}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Varun S</p>
        </nav>
      </section>
      <section className="main">
        <h1>VarunGPT</h1>
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              placeholder="Send a message ..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            <u>ChatGPT Mar 23 Version.</u> Free Research Preview. ChatGPT may
            produce inaccurate information about people, places, or facts
          </p>
        </div>
      </section>
    </div>
  );
};
export default App;
