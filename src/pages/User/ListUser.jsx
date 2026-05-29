import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../component/layout";
import Pagination from "../../component/Pagination";
import TableEmptyMsg from "../../component/table/TableEmptyMsg";

import {
  useDeleteUserHRMutation,
  useListUserHRQuery,
} from "../../apis/userHR";
import DeleteTableEmployee from "../../component/delete/DeleteTableEmployee";
import DeleteUser from "../../component/delete/DeleteUser";

const ListUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // =========================
  // LIST API
  // =========================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useListUserHRQuery(
    {
      page: currentPage,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // =========================
  // DELETE API
  // =========================
  const [deleteUserHR, { isLoading: deleteLoading }] =
    useDeleteUserHRMutation();

  const users = data?.users?.data || data?.data?.data || [];

  const totalPages =
    data?.users?.last_page ||
    data?.data?.last_page ||
    1;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // =========================
  // DELETE HANDLER
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteUserHR(id).unwrap();

      toast.success(
        response?.message || "User Deleted Successfully"
      );

      refetch();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Layout>
      <div className="container-fluid viewemployee main_inner_padding">
        {/* HEADER */}
        <div className="row mb-3 align-items-center">
          <div className="col-lg-6 px-1">
            <h3>User HR List</h3>
          </div>

          {/* <div className="col-lg-3 col-md-6 px-1">
            <div className="search_button">
              <input
                type="search"
                className="form-control inner_search_icon"
                placeholder="Search User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <i className="fa fa-search navi-search"></i>
            </div>
          </div> */}

          {/* <div className="col-lg-3 col-md-6 px-1">
            <Link
              to="/add-user-hr"
              style={{ textDecoration: "none" }}
            >
              <button className="btn addempbtn">
                Add User HR
              </button>
            </Link>
          </div> */}
        </div>

        {/* TABLE */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div id="table-scroll" className="table-scroll">
              <table
                id="main-table"
                className="main-table table"
              >
                <thead>
                  <tr>
                    <th
                      className="sticky-column-1 column-1"
                      style={{ background: "#e1e9ed" }}
                    >
                      #
                    </th>

                    <th
                      style={{ background: "#e1e9ed" }}
                    >
                      Name
                    </th>

                    <th
                      style={{ background: "#e1e9ed" }}
                    >
                      Email
                    </th>

                    <th
                      style={{ background: "#e1e9ed" }}
                    >
                      Role
                    </th>

                    <th
                      className="sticky-column-last"
                      style={{ background: "#e1e9ed" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{ height: "200px" }}
                      >
                        <TableEmptyMsg
                          loading={isLoading}
                          dataLength={0}
                        />
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <TableEmptyMsg
                          loading={false}
                          dataLength={0}
                        />
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="table_data_background"
                      >
                        <td className="sticky-column-1 column-1">
                          {index + 1}
                        </td>

                        <td>{user?.name}</td>

                        <td>{user?.email}</td>

                        <td>{user?.role}</td>
                        <td className="sticky-column-last">
                          <Link to={`/update-user/${user?.id}`} style={{ textDecoration: "none" }}>
                            <button type="button" className="btn act_btn_v">
                              <span className="hoverable">
                                <i className="fas fa-eye eye-cs"></i>
                              </span>
                            </button>
                          </Link>
                          &nbsp;&nbsp;
                          <DeleteUser id={user?.id} />
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default ListUser;