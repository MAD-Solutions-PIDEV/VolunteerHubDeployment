import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from "../services/userService";
import { useNavigate } from 'react-router-dom';





function UserDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [image, setImage] = useState("");


  const [birthday, setBirthday] = useState("");

  useEffect(() => {
  getUserById(id)
      .then((res) => {
        if (res) {
           setUser(res) ;
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setPhone(res.phone);
          setBirthday(res.birthday);
          setEmail(res.email);
          setImage(res.image);
       
        }
      })
      .catch((error) => console.log(error));
  },[id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <form >
        <div class="main_content_iner overly_inner ">
          <div class="container-fluid p-0  ">
            <div class="row">
              <div class="col-12">
                <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                  <div class="page_title_left d-flex align-items-center">
                    <h3 class="f_s_25 f_w_700 dark_text mr_30">
                      {firstName} {lastName} Information
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
                   
                  </div>
                  <div class="white_card_body">
                   

                    <div class="row  ">
                      <div class="col-lg-3 ">
                        <div class="common_input mb_15">
                          <div class="form-group">
                            <div class="custom-file">
                              
                             
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
                          <label>
                           {firstName}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="lastname">Last Name :</label>
                          <label>
                           {lastName}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="email">Email Address :</label>
                          <label>
                           {email}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="phone">Phone Number :</label>
                          <label>
                           {phone}
                            
                            </label>
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="birthday">Birthday Date :</label>
                          <label>
                           {birthday}
                            
                            </label>
                        </div>
                      </div>

                      
                      <div class="col-12">
                        <div class="create_report_btn mt_30">
                          <button
                         
                            class="text-center btn_1 "
                           onClick={()=>navigate("/dashboard/users/list")}
                           
                          >
                            Return
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
  
function handleClick() {
  
  
 

}
}

export default UserDetails;
