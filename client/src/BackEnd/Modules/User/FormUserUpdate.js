import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateUser, getUserById } from "../services/userService";
import UpdateListUser from "./UpdateListUser";

function NotificationBar({ message }) {
  return message ? (
    <div className="alert alert-success mt-3" role="alert">
      {message}
    </div>
  ) : null;
}



function FormUserUpdate() {
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [firstAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [languageSpoken, setlanguageSpoken] = useState('');
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState({
    firstAddress: "",
    secondAddress: "",
    country: "",
    zipCode: "",
    state: "",
  });
  const [notification, setNotification] = useState(null);
  
	const [user, setUsers] = useState([]); // Add state variable
  useEffect(() => {
    localStorage.setItem("userId", id); // set the id in local storage
    const storedId = localStorage.getItem("userId"); // get the id from local storage
    console.log("Stored Id:", storedId); // log the stored id to the console

    getUserById(storedId)
      .then((res) => {
        if (res) {
          const user = res;
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setPhone(res.phone);
          setBirthday(res.birthday);
          setEmail(res.email);
          setImage(res.image);
          setFirstAddress(res.address[0].firstAddress);
          setSecondAddress(res.address[0].secondAddress);
          setState(res.address[0].state);
          setZipCode(res.address[0].zipCode);
          setCountry(res.address[0].country);
          setlanguageSpoken(res.languageSpoken[0].language);
          setlanguageSpoken(res.languageSpoken[0].level);
          setSkills(res.skills); 
        }
        
      })
      .catch((error) => console.log(error));
  }, [id]);
  const handleUpdate = () => {
    const updatedUser = {
      email,
      firstName,
      lastName,
      phone,
      gender,
      status,
      image,
      birthday,
      newPassword,
      address: {
        firstAddress,
        secondAddress,
        state,
        zipCode,
        country,
      },
    };

    updateUser(id, updatedUser)
      .then((res) => {
        console.log(res.data);
        window.scrollTo(0, 0);
        setNotification("Profile updated successfully"); // Set notification message on success
      })
      .catch((error) => {
        console.log(error.response.data);
        setNotification("An error occurred while updating profile"); // Set notification message on error
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };
  return (
    <>
      <NotificationBar message={notification} /> {/* Render notification bar */}
      <form onSubmit={handleSubmit}>
        <div class="main_content_iner overly_inner ">
          <div class="container-fluid p-0  ">
            <div class="row">
              <div class="col-12">
                <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                  <div class="page_title_left d-flex align-items-center">
                    <h3 class="f_s_25 f_w_700 dark_text mr_30">
                      Update Profile Information
                    </h3>
                  </div>
                  <div class="page_title_right">
                    <div class="page_date_button d-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/icon/calender_icon.svg"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 ">
                <div class="white_card card_height_100 mb_30 ">
                  <div class="white_card_header">
                    <div class="box_header m-0">
                      <div class="main-title">
                        <h3 class="m-0">Update Profile </h3>
                      </div>
                    </div>
                  </div>
                  <div class="white_card_body">
                    {/* <table>
                      <tbody>
                        {user.map((use, index) => (
                          <tr key={use.id}>
                            <td>{index + 1}</td>
                            <td>{use.firstName}</td>
                            <td>{use.email}</td>
                            <td>{use.gender}</td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}

                    <div class="row  ">
                      <div class="col-lg-3 ">
                        <div class="common_input mb_15">
                          <div class="form-group">
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04"
                                onChange={(e) =>
                                  setImage(
                                    URL.createObjectURL(e.target.files[0])
                                  )
                                }
                                style={{ display: "none" }}
                              />
                              <label
                                htmlFor="file-input"
                                className="custom-file-upload"
                                class="custom-file-label btn_1"
                              >
                                <input
                                  id="file-input"
                                  type="file"
                                  style={{ display: "none" }}
                                  onInput={(e) =>
                                    setImage(
                                      URL.createObjectURL(e.target.files[0])
                                    )
                                  }
                                />
                                Choose a file
                              </label>
                            </div>
                          </div>
                          {image && <img src={image} alt="Selected image" />}
                        </div>
                      </div>

                      <div class="col-lg-">
                        <div class="common_input mb_15 col-sm-6 col-lg-6 ">
                          <label htmlFor="firstname" className="form-label">
                            First Name :
                          </label>
                          <input
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="lastname">Last Name :</label>
                          <input
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="email">Email Address :</label>
                          <input
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="phone">Phone Number :</label>
                          <input
                            placeholder="Phone Number"
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="birthday">Birthday Date :</label>
                          <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="firstAddress">First Address :</label>
                          <input
                            placeholder="First Address"
                            type="text"
                            value={firstAddress}
                            onChange={(e) => setFirstAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="secondAdress">Second Address :</label>
                          <input
                            placeholder=" Second Address"
                            type="text"
                            value={secondAddress}
                            onChange={(e) => setSecondAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="country">Country :</label>
                          <input
                            placeholder="Country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="state">State :</label>
                          <input
                            placeholder="Zip Code"
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="zipcode">Zip Code :</label>
                          <input
                            placeholder="State"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="zipcode">Password :</label>
                          <input
                            placeholder="Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="create_report_btn mt_30">
                          <button
                            type="submit"
                            class="  text-center btn_1 "
                            onClick={handleUpdate}
                          >
                            Update Information
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
 
                                }


export default FormUserUpdate;
