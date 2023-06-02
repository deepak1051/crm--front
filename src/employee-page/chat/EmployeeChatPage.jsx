import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import { format } from "timeago.js";
import "./chat.css";
import { Helmet } from "react-helmet";

import {
  getRoom,
  addUserToRoom,
  sendMessage,
  getAllMessages,
  deleteMessage,
  fetchSingleEmployee,
} from "../../store";

import { AiFillDelete } from "react-icons/ai";

const EmployeeChatPage = () => {
  const { singleEmployee } = useSelector((state) => state.admin);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { roomId, messages } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const [onlineUser, setOnlineUser] = useState([]);
  const divRef = useRef(null);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoom())
      .unwrap()
      .then(() => dispatch(addUserToRoom({ roomId })))
      .catch((err) => console.log(err.message));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomId) {
      dispatch(getAllMessages({ roomId }))
        .unwrap()
        .then((data) => {
          setChats((pre) => [...pre, ...data]);
        })
        .catch((err) => console.log(err.message));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  async function fetchData(messageData) {
    const subscription = await navigator.serviceWorker.ready.then(
      (registration) => {
        return registration.pushManager.getSubscription();
      }
    );
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
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    socket.current = io("https://chat.pacifencesolutions.com/");
    socket.current.on("connect", () => {
      console.log("socket connected done");
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", singleEmployee._id);
    socket.current.on("getUser", (users) => {
      setOnlineUser(users);
    });
  }, [singleEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(message);

    dispatch(sendMessage({ roomId, message }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
      })
      .catch((err) => console.log(err.message));
    const messageId = messages[messages.length - 1]._id;
    socket.current.emit("chat", {
      message,
      createdAt: Date.now(),
      name: singleEmployee.name,
      senderId: singleEmployee._id,
      messageId,
      profilePic: singleEmployee.image,
    });

    setMessage("");
    // socket.current.emit('send_message', { message });
  };

  useEffect(() => {
    socket.current.off("chat").on("chat", (payload) => {
      setChats((prev) => [...prev, payload]);
    });
    // return () => {
    //   socket.current.off("chat", (payload) => {
    //     console.log(payload);
    //   });
    // };
  }, [chats]);
  console.log(messages);
  console.log(chats);

  const handleRemove = (id) => {
    setChats((data) => {
      return data.filter(
        (message) => `${message._id ? message._id : message.messageId}` !== id
      );
    });
    if (id) {
      dispatch(deleteMessage({ messageId: id }))
        .unwrap()
        .then(() => {
          dispatch(getAllMessages({ roomId }));
        })
        .catch((err) => console.log(err.message));
    }
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
                  backgroundImage: `url(https://api.pacifencesolutions.com/${
                    item.senderId.image ? item.senderId.image : item.profilePic
                  })`,
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
                        onClick={() =>
                          handleRemove(
                            `${item._id ? item._id : item.messageId}`
                          )
                        }
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

export default EmployeeChatPage;
