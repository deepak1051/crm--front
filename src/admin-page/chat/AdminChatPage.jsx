import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './chat.css';
import { io } from 'socket.io-client';
import { fetchSingleEmployee } from '../../store';
import { nanoid } from 'nanoid';

const socket = io('https://chat.pacifencesolutions.com');

const AdminChatPage = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const { id } = useSelector((state) => state.auth);
  const { singleEmployee } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleEmployee({ id }));
  }, [dispatch, id]);

  console.log('singleemployee', singleEmployee);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, id: nanoid(), name: singleEmployee.name });
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (payload) => {
      console.log(payload);
      setChat((prev) => [...prev, payload]);
    });
  }, []);

  console.log(chat);

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
          <div class="msg left-msg">
            <div
              class="msg-img"
              style={{
                backgroundImage:
                  'url(https://image.flaticon.com/icons/svg/327/327779.svg)',
              }}
            ></div>

            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">BOT</div>
                <div class="msg-info-time">12:45</div>
              </div>

              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>

          {chat.map((item) => (
            <div class="msg right-msg" key={item.id}>
              <div
                class="msg-img"
                style={{
                  backgroundImage:
                    "url('https://image.flaticon.com/icons/svg/145/145867.svg')",
                }}
              ></div>

              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">{item.name}</div>
                  <div class="msg-info-time">12:46</div>
                </div>

                <div class="msg-text">{item.message}</div>
              </div>
            </div>
          ))}
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
