import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Notification.css";
import { useIsReadNotificationMutation } from "../../../apis/SuperAdmin/notification";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
    const [isReadNotification] = useIsReadNotificationMutation();
  
  const notificationsAll = useSelector((state) => state.notification.all); // from API
  const notifications = useSelector((state) => state.notification.unread); // from API

  const count = useSelector((state) => state.notification.count); // badge count
  const dropdownRef = useRef(null);
console.log(notifications)
const handleOpen =()=>{
  setOpen((prev) => !prev)
  const notificationIds = notificationsAll.map((notification) => notification.id);
   isReadNotification({ notification_ids: notificationIds });
  // isReadNotification({ notification_ids:'' })
}
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-dropdown position-relative" ref={dropdownRef}>
      <button
        className="btn btn-link text-dark position-relative"
        onClick={() => handleOpen()}

      >
        <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
        {count > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          className="dropdown-menu show p-2 shadow-sm"
          style={{
            right: 0,
            width: 300,
            maxHeight: 300,
            overflowY: "auto",
            position: "absolute",
            top: "100%",
            zIndex: 1000,
          }}
        >
          <h6 className="dropdown-header">Notifications</h6>
          {notificationsAll.length === 0 ? (
            <div className="dropdown-item text-muted">No notifications</div>
          ) : (
            notificationsAll.map((notif) => (
              <div key={notif.id} className="dropdown-item">
                <div>
                  <strong>{notif.title}</strong>
                </div>
                <div>{notif.message || notif.email}</div>
                <small className="text-muted">
                  {new Date(notif.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
               <div className="dropdown-item text-center">
               <Link
  to="/super-admin/notification-list"
  className="btn btn-sm w-100 text-white"
  style={{ backgroundColor: "#134D75" }}
>
  View All Notifications
</Link>

     
        </div>
        </div>
      )}
    </div>
  );
};


export default NotificationDropdown;
