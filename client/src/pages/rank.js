import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import NewsPage from "components/VolunteerNews/NewsPage";
import PageTitle from "components/Reuseable/PageTitle";
import React, { useState, useEffect } from "react"; // Note the curly braces around useState and useEffect
import UserRank from "components/UserRank/userRank";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip,
} from "reactstrap";

const Rank = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userState, setUserState] = useState({});
  const [usersConnect, setUsersConnect] = useState([]);
  const [image, setImage] = useState("");
  const [divisionsRank, setDivisionsRank] = useState("");
  const [scoreRank, setScoreRank] = useState("");
  const [raised, setRaised] = useState("");
  let r = 0;
  useEffect(() => {
    document.title = "Rank"; // set new title

    const fetchUsers = async () => {
      try {
        const user = await localStorage.getItem("user");
        console.log("user connect localstorage " + user);
        setUserState(JSON.parse(user));
        console.log("user id " + JSON.parse(user).id);

        const response = await fetch(
          "https://volunteerhub-backend.onrender.com/rank/usersRanks"
        );
        const data = await response.json();
        setUsers(data.userData);
        console.log("user 10 :" + data.userData);

        const response2 = await fetch(
          `https://volunteerhub-backend.onrender.com/rank/userRank/${
            JSON.parse(user).id
          }`
        );
        const data2 = await response2.json();
        console.log("user 12 :" + JSON.stringify(data2.userData2));
        setUsersConnect(data2.userData2);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []); // This empty array means that this useEffect will only run once on component mount

  useEffect(() => {
    if (usersConnect.length > 0) {
      // You need to check if the usersConnect array is not empty before accessing its first element
      setImage(`/rank/${usersConnect[0].rank?.divisions}.png`);
      console.log("imageeee " + image);
      setScoreRank(usersConnect[0].rank?.rankScore);
      setDivisionsRank(usersConnect[0].rank?.divisions);

      if (usersConnect[0].rank?.rankScore > 0) {
        setRaised(20);
      }

      switch (true) {
        case usersConnect[0].rank?.rankScore >= 50 &&
          usersConnect[0].rank?.rankScore <= 100:
          setRaised(100);
          break;
        case usersConnect[0].rank?.rankScore > 100 &&
          usersConnect[0].rank?.rankScore <= 200:
          setRaised(200);
          break;
        case usersConnect[0].rank?.rankScore > 200 &&
          usersConnect[0].rank?.rankScore <= 350:
          setRaised(350);
          break;
        case usersConnect[0].rank?.rankScore > 350 &&
          usersConnect[0].rank?.rankScore <= 500:
          setRaised(500);
          break;
        case usersConnect[0].rank?.rankScore > 500 &&
          usersConnect[0].rank?.rankScore <= 700:
          setRaised(700);
          break;
        case usersConnect[0].rank?.rankScore > 700:
          setRaised(999);
          break;
      }
    }
  }, [usersConnect]); // This will re-run the effect every time the usersConnect state changes

  const sortedUsers = users.sort((a, b) => b.rank.rankScore - a.rank.rankScore);

  //console.log('user 14 :' + JSON.stringify(usersConnect[0].rank.rankScore))

  return (
    <Layout>
      <style>{`

        
        .mt-1 {
          margin-top: 0.25rem !important;
        }
        .shadow{
          box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
        }
        [class*="shadow"] {
          transition: all 0.15s ease;
        }
        .shadow--hover:hover {
          box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
        }
        
        .table-flush td,
        .table-flush th {
          border-left: 0;
          border-right: 0;
        }
        
        .table-flush tbody tr:first-child td,
        .table-flush tbody tr:first-child th {
          border-top: 0;
        }
        
        .table-flush tbody tr:last-child td,
        .table-flush tbody tr:last-child th {
          border-bottom: 0;
        }
        .table.align-items-center td,
        .table.align-items-center th {
          vertical-align: middle;
        }
        .table .thead-light th {
          background-color: #f6f9fc;
          color: #8898aa;
        }
        
        .table-hover tr {
          transition: all 0.15s ease;
        }
        .table thead th {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .table th {
          font-weight: 600;
        }
        
        .table td .progress {
          height: 3px;
          width: 120px;
          margin: 0;
        }
        
        .table td,
        .table th {
          font-size: 0.8125rem;
          white-space: nowrap;
        }
        .mt-2{
          margin-top: 0.5rem !important;
        }
        `}</style>
      <Header />
      <PageTitle title="Division" />
      <div>
        {usersConnect && (
          <div className="row">
            <div className="col-3  d-flex justify-content-center my-5">
              <div className="d-flex justify-content-center my-5">
                &nbsp;&nbsp;&nbsp;&nbsp;<h3>Your rank is {divisionsRank}</h3>{" "}
              </div>

              <img
                alt="..."
                className="rounded-circle"
                src={image}
                width="80"
                height="80"
              />
            </div>
            <div className="col-6">
              <div className="explore-projects-item mt-30">
                <div className="explore-projects-content">
                  <div className="item d-flex align-items-center">
                    <img
                      alt="..."
                      src="/rank/nouser.png"
                      width="85"
                      height="85"
                    />
                  </div>

                  <div className="ProgressBar">
                    <div className="projects-range-content">
                      <ul>
                        <li>Raised:</li>
                        <li>{Math.floor((scoreRank / raised) * 100)}%</li>
                      </ul>
                      <ProgressBar
                        now={Math.floor((scoreRank / raised) * 100)}
                      />
                    </div>{" "}
                    <div className="projects-range"></div>
                  </div>
                  <div className="projects-goal">
                    <span>
                      Score: <span>{scoreRank}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div class="main_content_iner ">
          <div class="container-fluid p-0">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="white_card card_height_100 mb_30">
                  <div class="white_card_header">
                    <div class="box_header m-0">
                      <div class="main-title">
                        <h3 class="m-0">Top 10</h3>
                      </div>
                    </div>

                    <Table className="align-items-center" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Users</th>
                          <th scope="col">Score</th>
                          <th scope="col">Rank</th>
                          <th scope="col">Division</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <React.Fragment key={user._id}>
                            <UserRank userR={user} index={i + 1} />
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rank;
