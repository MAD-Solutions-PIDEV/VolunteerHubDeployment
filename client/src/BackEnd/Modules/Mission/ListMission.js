import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getMission } from "../services/missionService";
import MissionControle from "./MissionControle";


function ListMission() {
  const [missions, setMission] = useState([]);

  useEffect(() => {
    getMission()
      .then((res) => {
        setMission(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
 
  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">List Missions</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="QA_section">
                  <div className="QA_table mb_30">
                    <table className="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Status</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {missions.map((mission) => (

                          <tr key={mission._id}>

                            <td>{mission.Title}</td>
                           
                            <td>{mission.Description}</td>
                            <td>{mission.StartDate}</td>
                            <td>{mission.EndDate}</td>
                            

                            <td>
                              <div scope="col">
                                <MissionControle
                                  id={mission._id}
                                  status={mission.status}
                                ></MissionControle>
                              </div>
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
  function handleViewMission(Id) {
    window.location.href = `/dashboard/mission/${Id}`;
  }
}

export default ListMission;