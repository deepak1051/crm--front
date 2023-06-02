import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { io } from 'socket.io-client';
import { format } from 'timeago.js';
import './chat.css';
import { Helmet } from 'react-helmet';

import {
  getRoom,
  addUserToRoom,
  sendMessage,
  getAllMessages,
  deleteMessage,
  fetchSingleEmployee,
} from '../../store';

import { AiFillDelete } from 'react-icons/ai';

// import { io } from 'socket.io-client';
const default_img_url = 'https://api.pacifencesolutions.com';

const EmployeeChatPage = () => {
  const { singleEmployee } = useSelector((state) => state.admin);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const { roomId, messages } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const [onlineUser, setOnlineUser] = useState([]);
  const divRef = useRef(null);
  const socket = useRef();
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
      'https://api.pacifencesolutions.com/api/chat/messageSubscribe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription, payload }),
      }
    );
    console.log('push sent...');
  }

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    socket.current = io('https://chat.pacifencesolutions.com/');
    socket.current.on('connect', () => {
      console.log('socket connected done');
    });
  }, []);
  // console.log("helo");
  // console.log(dispatch(getAllMessages({ roomId })));
  // console.log(...messages);
  useEffect(() => {
    socket.current.emit('addUser', singleEmployee._id);
    socket.current.on('getUser', (users) => {
      setOnlineUser(users);
    });
  }, [singleEmployee]);

  useEffect(() => {
    setChats((pre) => [...pre, ...messages]);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.current.emit('chat', {
      message,
      createdAt: Date.now(),
      name: singleEmployee.name,
      senderId: singleEmployee._id,
      profilePic: singleEmployee.image,
    });

    dispatch(sendMessage({ roomId, message }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
      })
      .catch((err) => console.log(err.message));
    setMessage('');

    // socket.current.emit('send_message', { message });
  };
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
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    socket.current.off('chat').on('chat', (payload) => {
      console.log(payload);
      setChats((prev) => [...prev, payload]);
    });
    // return () => {
    //   socket.current.off("chat", (payload) => {
    //     console.log(payload);
    //   });
    // };
  }, [chats]);

  const handleRemove = (id) => {
    dispatch(deleteMessage({ messageId: id }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
      })
      .catch((err) => console.log(err.message));
  };

  console.log(chats);

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
          {chats.map((item) => {
            console.log(item);
            const Image = item.profilePic
              ? `${default_img_url}/${item.profilePic})`
              : 'https://i.pinimg.com/736x/87/67/64/8767644bc68a14c50addf8cb2de8c59e.jpg';
            return (
              <div
                class={
                  `${item.senderId._id ? item.senderId._id : item.senderId}` ===
                  id
                    ? 'msg right-msg'
                    : 'msg left-msg'
                }
                key={item.createdAt}
              >
                <div
                  class="msg-img"
                  style={{
                    backgroundImage: `url(${default_img_url}/${item.profilePic})`,
                  }}
                  //
                >
                  {/* <img src={`${default_img_url}/${item.profilePic}`} alt="" /> */}
                </div>

                <div class="msg-bubble">
                  <div class="msg-info">
                    <div class="msg-info-name">
                      {item.senderId.name ? item.senderId.name : item.name}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                            marginLeft: '10px',
                            color: 'red',
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div class="msg-text">{item.message}</div>
                </div>
              </div>
            );
          })}

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

// const [chat, setChat] = useState([]);

// const { id } = useSelector((state) => state.auth);
// const { singleEmployee } = useSelector((state) => state.admin);

// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(fetchSingleEmployee({ id }));
// }, [dispatch, id]);

// console.log('singleemployee', singleEmployee);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   socket.emit('chat', { message, id: nanoid(), name: singleEmployee.name });
//   setMessage('');
// };

// useEffect(() => {
//   socket.on('chat', (payload) => {
//     console.log(payload);
//     setChat((prev) => [...prev, payload]);
//   });
// }, []);

// console.log(chat);
