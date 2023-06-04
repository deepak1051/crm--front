import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [show, setShow] = useState(false);

  // add user to room
  useEffect(() => {
    dispatch(getRoom())
      .unwrap()
      .then(() => dispatch(addUserToRoom({ roomId })))
      .catch((err) => console.log(err.message));
  }, [dispatch, roomId]);

  // get all messages and set chats
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

  // scroll to bottom
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  // send push notification
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

  // fetch single employee
  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  // socket connection
  useEffect(() => {
    socket.current = io("https://chat.pacifencesolutions.com/");
    socket.current.on("connect", () => {
      console.log("socket connected done");
    });
  }, []);

  // add user to socket
  useEffect(() => {
    socket.current.emit("addUser", singleEmployee._id);
    socket.current.on("getUser", (users) => {
      setOnlineUser(users);
    });
  }, [singleEmployee]);

  // send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      await fetchData(message);
      dispatch(sendMessage({ roomId, message }))
        .unwrap()
        .then((data) => {
          dispatch(getAllMessages({ roomId }));
          socket.current.emit("chat", {
            message,
            createdAt: Date.now(),
            senderId: {
              _id: singleEmployee._id,
              image: singleEmployee.image,
              name: singleEmployee.name,
            },
            _id: data._id,
          });
        })
        .catch((err) => console.log(err));
    }
    setMessage("");
    // socket.current.emit('send_message', { message });
  };

  // receive message
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

  // delete message
  const handleRemove = (id) => {
    setChats((data) => {
      return data.filter((message) => message._id !== id);
    });

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
                item.senderId._id === id ? "msg right-msg" : "msg left-msg"
              }
              key={item._id}
            >
              <div
                class="msg-img"
                style={{
                  backgroundImage: `url(https://api.pacifencesolutions.com/${item.senderId.image})`,
                }}
              ></div>

              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">{item.senderId.name}</div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.createdAt && (
                      <div class="msg-info-time">
                        {format(new Date(item.createdAt))}
                      </div>
                    )}

                    {item.senderId._id === id && (
                      <AiFillDelete
                        onClick={() => handleRemove(item._id)}
                        style={{
                          opacity: "1",
                          transition: "all 1s ease-in-out",
                          marginleft: "10px",
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
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setShow(true);
                return setMessage(e.target.value);
              } else {
                setShow(false);
                return setMessage(e.target.value);
              }
            }}
          />

          <button
            type="submit"
            class={show ? "msger-send-btn" : "msger-send-btn-disabled"}
            onClick={() => {
              setShow(false);
            }}
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default EmployeeChatPage;
