import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import "./chat.css";

import {
  getRoom,
  addUserToRoom,
  sendMessage,
  getAllMessages,
  deleteMessage,
} from "../../store";

import { useRef } from "react";

const AdminChatPage = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const socket = useRef();
  const [onlineUser, setOnlineUser] = useState([]);

  const { roomId, messages } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const divRef = useRef(null);

  const dispatch = useDispatch();

  async function fetchData(messageData) {
    const subscription = await navigator.serviceWorker.ready.then(
      (registration) => {
        return registration.pushManager.getSubscription();
      }
    );
    console.log(messageData);
    // Prepare the payload data for the push notification
    const payload = {
      title: singleEmployee.name,
      message: messageData,
      // Include any additional data you want to send
    };

    // Make an HTTP request to the backend API endpoint
    await fetch(
      "https://api.pacifencesolutions.com/api/chat/messageSubscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription, payload }),
      }
    );
    console.log("push sent...");
  }

  useEffect(() => {
    socket.current = io("https://chat.pacifencesolutions.com/");
  }, []);

  useEffect(() => {
    setChats((pre) => [...pre, ...messages]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchData(message);

    socket.current.emit("chat", {
      message,
      name: "Admin",
      createdAt: Date.now(),
      senderId: id,
    });
    dispatch(sendMessage({ roomId, message }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
      })
      .catch((err) => console.log(err.message));
    setMessage("");
  };
  useEffect(() => {
    socket.current.emit("addUser", id);

    socket.current.on("getUser", (users) => {
      setOnlineUser(users);
      console.log(onlineUser);
    });
  }, [chats]);

  useEffect(() => {
    dispatch(getRoom())
      .unwrap()
      .then(() => dispatch(addUserToRoom({ roomId })))
      .catch((err) => console.log(err.message));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomId) {
      dispatch(getAllMessages({ roomId }));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    socket.current.off("chat").on("chat", (payload) => {
      console.log(payload);
      setChats((prev) => [...prev, payload]);
    });
  }, [chats]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleRemove = (id) => {
    dispatch(deleteMessage({ messageId: id }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="msger-container">
      <Helmet>
        <script
          src="https://api.pacifencesolutions.com/client.js"
          type="application/javascript"
        ></script>
      </Helmet>
      <section class="msger">
        <header class="msger-header">
          <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> Chat
          </div>
          <div class="msger-header-options">
            <span>{/* <i class="fas fa-cog"></i> */}</span>
          </div>
        </header>

        <main class="msger-chat">
          {chats.map((item) => (
            <div
              class={
                `${item.senderId._id ? item.senderId._id : item.senderId}` ===
                id
                  ? "msg right-msg"
                  : "msg left-msg"
              }
              key={item.createdAt}
            >
              <div
                class="msg-img"
                style={{
                  backgroundImage:
                    "url('https://image.flaticon.com/icons/svg/145/145867.svg')",
                }}
              ></div>

              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">
                    {item.senderId.name ? item.senderId.name : item.name}
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.createdAt && (
                      <div class="msg-info-time">
                        {format(new Date(item.createdAt))}
                      </div>
                    )}
                    {`${
                      item.senderId._id ? item.senderId._id : item.senderId
                    }` === id && (
                      <AiFillDelete
                        onClick={() => handleRemove(item._id)}
                        style={{
                          marginLeft: "10px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div class="msg-text">{item.message}</div>
              </div>
            </div>
          ))}

          <div ref={divRef} />
        </main>

        <form class="msger-inputarea" onSubmit={handleSubmit}>
          <input
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" class="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminChatPage;
