import React, { useState } from "react";

function UserProfile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState({
    firstAddress: "",
    secondAddress: "",
    country: "",
    zipCode: "",
    state: "",
  });

  return (
    <>
      <form>
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
                        <h3 class="m-0">User Profile </h3>
                      </div>
                    </div>
                  </div>
                  <div class="white_card_body">
                    <div class="row  ">
                      <div class="col-lg-3 ">
                        <div class="common_input mb_15">
                          <div class="form-group">
                            <div class="custom-file">
                              <label htmlFor="image">Profile Picture:</label>
                              <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
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
                          <label htmlFor="firstName">First Name:</label>
                          <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="lastName">Last Name:</label>
                          <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="email">Email:</label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="phone">Phone:</label>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="birthday">Birthday:</label>
                          <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="firstAddress">Address Line 1:</label>
                          <input
                            type="text"
                            id="firstAddress"
                            value={address.firstAddress}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                firstAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="secondAddress">Address Line 2:</label>
                          <input
                            type="text"
                            id="firstAddress"
                            value={address.secondAddress}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                secondAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="country">Country:</label>
                          <input
                            type="text"
                            id="country"
                            value={address.country}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          {" "}
                          <label htmlFor="zipcode">Zip Code:</label>
                          <input
                            type="text"
                            id="zipcode"
                            value={address.zipCode}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                zipCode: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <div class="common_input mb_15">
                          {" "}
                          <label htmlFor="State">State:</label>
                          <input
                            type="text"
                            id="state"
                            value={address.state}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="create_report_btn mt_30"></div>
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

export default UserProfile;
