import React, { useEffect, useState } from "react";

import { useGetNotificationsQuery, useIsReadNotificationByIdMutation, useIsReadNotificationMutation } from "../../../apis/SuperAdmin/notification";
import Pagination from "../../../component/Pagination";
import NotificationDelete from "../../../component/SuperAdmin/NotificationDelete";

const NotificationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isReadNotificationById] = useIsReadNotificationByIdMutation();
  const [isReadNotification] = useIsReadNotificationMutation();
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useGetNotificationsQuery({
    page: currentPage,
    search: debouncedSearch,
  });

  const notifications = data?.notificationlists?.data || [];
  const totalPages = data?.notificationlists?.last_page || 1;

  // Reset to page 1 when debounced search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Mark all notifications as read (you can customize this logic as needed)
      const notificationIds = notifications.map((notification) => notification.id);
      await isReadNotification({ notification_ids: notificationIds }).unwrap();
      refetch(); // Refetch notifications after marking them as read
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-6">
          <h3>Notifications</h3>
        </div>
        <div className="col-lg-3 col-md-6 pb-4">
        <button type="button" class="btn btn-outline-secondary" onClick={markAllAsRead}>Mark All as Read</button>
   
          </div>
        <div className="col-lg-3 col-md-6 pb-4">
          <div className="search_button">
            <input
              type="search"
              className="form-control inner_search_icon"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa fa-search navi-search"></i>
          </div>
        </div>
       
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          {/* Read All Button */}
         

          <div id="table-scroll" className="table-scroll">
            <table id="main-table" className="main-table table">
              <thead>
                <tr>
                  <th className="sticky-column-1 column-1" style={{ background: "#e1e9ed" }}>Title</th>
                  <th style={{ background: "#e1e9ed" }}>Status</th>
                  <th style={{ background: "#e1e9ed" }}>Created At</th>
                  <th className="sticky-column-last" style={{ background: "#e1e9ed" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" style={{ height: "200px" }}>
                      Loading...
                    </td>
                  </tr>
                ) : !notifications.length ? (
                  <tr>
                    <td colSpan="4">No Notifications Found</td>
                  </tr>
                ) : (
                  notifications.map((notification, index) => (
                    <tr key={index} className="table_data_background">
                      <td className="sticky-column-1 column-1">{notification.title}</td>
                      <td>
                        <button
                          className={`btn ${notification.is_read ? "btn-success" : "btn-danger"}`}
                          onClick={async () => {
                            try {
                              await isReadNotificationById({ notification_id: notification.id }).unwrap();
                              refetch();
                            } catch (error) {
                              console.error("Error marking notification as read:", error);
                            }
                          }}
                        >
                          {notification.is_read ? "Read" : "Unread"}
                        </button>
                      </td>
                      <td>{new Date(notification.created_at).toLocaleString()}</td>
                      <td className="sticky-column-last">
                        <NotificationDelete id={notification?.id} onDeleteSuccess={refetch} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-md-12 mt-4"></div>
      <div>
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationList;
