import React, { useEffect, useState } from 'react'
import Notification from "../../img/notification2.png"
import Message from "../../img/message.svg"
import Settings from "../../img/settings.svg"

import './Navbar.css'

const Navbar = ({ socket}) => {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    socket.on("getNotification", data => {
      setNotifications(prev => [...prev,data]);
    })
  }, [socket])

  const displayNotification = ({senderName, type}) => {
    let action;

    if (type === 1) {
      action = 'liked'
    } else if ( type === 2) {
      action = "commented"
    } else {
      action = 'shared'
    }

    return (
      <span className='notification' >{`${senderName} ${action} your post`}</span>
    )
  }

  const handleRead = () => {
    setNotifications([])
    setOpen(false)
  }

  return (
    <div className="navbar">
      <span className="logo">LOGO</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} alt="" className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} alt="" className="iconImg" />
          <div className="counter">2</div>
        </div>

        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} alt="" className="iconImg" />
          <div className="counter">2</div>
        </div>
      </div>

      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar