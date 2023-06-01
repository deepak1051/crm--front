import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Model = ({ onClose, children, ActionBar }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-400 opacity-80"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'gray',
          opacity: 0.8,
        }}
      ></div>
      <div
        className="fixed inset-40 p-10 bg-white"
        style={{
          position: 'fixed',
          top: '200px',
          left: '200px',
          right: '200px',
          bottom: '200px',
          padding: '100px',
          backgroundColor: 'white',
          opacity: 0.8,
        }}
      >
        <div
          className="flex flex-col justify-between gap-2 h-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            height: '100%',
          }}
        >
          {children}

          <div className="flex justify-end">{ActionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('.model-container')
  );
};

export default Model;
