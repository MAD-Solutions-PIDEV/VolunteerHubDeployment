import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getUsers } from "../services/userService";
import UserStatus from "./UserControle";

function ListUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);
  const Users = users.filter(
    (user) => user.status === "active" || user.status === "blocked"
  );
  console.log(Users);
  return (
    <div class="main_content_iner ">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="white_card card_height_100 mb_30">
              <div class="white_card_header">
                <div class="box_header m-0">
                  <div class="main-title">
                    <h3 class="m-0">List Users</h3>
                  </div>
                </div>
              </div>
              <div class="white_card_body">
                <div class="QA_section">
                  <div class="QA_table mb_30">
                    <table class="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((user) => (

                          <tr key={user._id}>

                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phone}</td>

                            <td>
                              <div scope="col">
                                <UserStatus
                                  id={user._id}
                                  status={user.status}
                                ></UserStatus>
                              </div>
                            </td>
                            <td>
                              <Button class="btn_1"  onClick={() => handleViewUser(user._id)} >View Details</Button>
                            </td>
                          </tr>

                        ))}

                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function handleViewUser(userId) {
    // Navigate to the user details page for the specified user ID
    window.location.href = `/dashboard/users/${userId}`;
  }
}

export default ListUser;