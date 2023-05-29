import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import './chat.css';

import {
  getRoom,
  addUserToRoom,
  sendMessage,
  getAllMessages,
  deleteMessage,
} from '../../store';

import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';

const EmployeeChatPage = () => {
  const [message, setMessage] = useState('');
  const { roomId, messages } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const divRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ roomId, message }))
      .unwrap()
      .then(() => {
        dispatch(getAllMessages({ roomId }));
        setMessage('');
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    dispatch(getRoom())
      .unwrap()
      .then(() => dispatch(addUserToRoom({ roomId })))
      .catch((err) => console.log(err.message));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomId) {
      console.log('first');
      dispatch(getAllMessages({ roomId }));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <section class="msger">
        <header class="msger-header">
          <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div class="msger-header-options">
            <span>
              <i class="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main class="msger-chat">
          {messages.map((item) => (
            <div
              class={
                item.senderId._id === id ? 'msg right-msg' : 'msg left-msg'
              }
              key={item._id}
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
                  <div class="msg-info-name">{item.senderId?.name}</div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {item.createdAt && (
                      <div class="msg-info-time">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    )}

                    {item.senderId._id === id && (
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

// const socket = io('https://chat.pacifencesolutions.com');

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
