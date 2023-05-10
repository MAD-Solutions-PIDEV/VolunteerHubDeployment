import React from "react";
import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../services/userService";
import UpdateUser from "./UpdateUser";
import FormUserUpdate from "./FormUserUpdate";

function UpdateListUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (id, updatedData) => {
    updateUser(id, updatedData).then((res) => {
      console.log(res);
      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, ...updatedData };
        }
        return user;
      });
      setUsers(updatedUsers);
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div class="main_content_iner ">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="white_card card_height_100 mb_30">
              <div class="white_card_header">
                <div class="box_header m-0">
                  <div class="main-title">
                    <h3 class="m-0">Update Users</h3>
                  </div>
                </div>
              </div>
              <div class="white_card_body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <UpdateUser
                          key={user._id}
                          user={user}
                          index={index}
                          handleEditUser={handleEditUser}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <FormUserUpdate
          user={selectedUser}
          handleUpdate={handleUpdate}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
}

export default UpdateListUser;
