import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAllCompaigns } from "services/campaignService"; 
import CampaignControle from "./CampaignControle";


function ListCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getAllCompaigns()
      .then((res) => {
        setCampaigns(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);
  const filtredcampaigns = campaigns.filter(
    (campaign) => campaign.status === "inactive" 
  );
  return (
    <div class="main_content_iner ">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="white_card card_height_100 mb_30">
              <div class="white_card_header">
                <div class="box_header m-0">
                  <div class="main-title">
                    <h3 class="m-0">List Campaigns</h3>
                  </div>
                </div>
              </div>
              <div class="white_card_body">
                <div class="QA_section">
                  <div class="QA_table mb_30">
                    <table class="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">deadline</th>
                          <th scope="col">goalAmount</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {filtredcampaigns.map((campaign) => (

                          <tr key={campaign._id}>

                            <td>{campaign.title}</td>
                           
                            <td>{campaign.deadline}</td>
                            <td>{campaign.goalAmount}</td>

                            <td>
                              <div scope="col">
                                <CampaignControle
                                  id={campaign._id}
                                  status={campaign.status}
                                ></CampaignControle>
                              </div>
                            </td>
                            <td>
                              <Button class="btn_1"  onClick={() => handleViewCampaign(campaign._id)} >View Details</Button>
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
  function handleViewCampaign(Id) {
    // Navigate to the user details page for the specified user ID
    window.location.href = `/dashboard/campaigns/${Id}`;
  }
}

export default ListCampaigns;