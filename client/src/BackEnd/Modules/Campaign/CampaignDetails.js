import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from 'services/campaignService';
import { useNavigate } from 'react-router-dom';





function CampaignDetails() {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");


  useEffect(() => {
  findById(id)
      .then((res) => {
        if (res) {
           setCampaign(res) ;
          setTitle(res.data.title);
          setDescription(res.data.description);
          setGoalAmount(res.data.goalAmount);
          setDeadline(res.data.deadline);
          setCurrentAmount(res.data.currentAmount);
       
        }
      })
      .catch((error) => console.log(error));
  },[id]);

  if (!campaign) {
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
                      {title}  Information
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
                          
                        </div>
                      </div>

                      <div class="col-lg-">
                        <div class="common_input mb_15 col-sm-6 col-lg-6 ">
                          <label htmlFor="title" className="form-label">
                            Title :
                          </label>
                          <label>
                           {title}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="description">Description :</label>
                          <label>
                           {description}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="deadline">Deadline :</label>
                          <label>
                           {deadline}
                            
                            </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="goalAmount">Goal Amount :</label>
                          <label>
                           {goalAmount}
                            
                            </label>
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="common_input mb_15 col-sm-6">
                          <label htmlFor="currentAmount">Current Amount :</label>
                          <label>
                           {currentAmount}
                            
                            </label>
                        </div>
                      </div>

                      
                      <div class="col-12">
                        <div class="create_report_btn mt_30">
                          <button
                         
                            class="text-center btn_1 "
                           onClick={()=>navigate("/dashboard/campaigns/list")}
                           
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
  


}

export default CampaignDetails;
