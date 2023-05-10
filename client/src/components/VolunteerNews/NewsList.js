import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewsList() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://volunteerhub-backend.onrender.com/news"
        );
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRefreshClickUnitedNations = async () => {
    try {
      await axios.get(
        "https://volunteerhub-backend.onrender.com/news/getNewsUnitedNations"
      );
    } catch (error) {
      console.error(error);
    }

    window.location.reload();
  };
  const handleRefreshClickBBC = async () => {
    try {
      await axios.get(
        "https://volunteerhub-backend.onrender.com/news/getNewsBBcAfrica"
      );
    } catch (error) {
      console.error(error);
    }

    window.location.reload();
  };
  console.log("news : " + JSON.stringify(newsData));
  console.log("type n:" + typeof newsData); // Check the type of newses prop
  console.log("type n2:" + typeof newsData.news); // Check the type of newses prop
  const newses = newsData.news;
  return (
    <div class="main_content_iner ">
      <div class="container-fluid p-0">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="white_card card_height_100 mb_30">
              <div class="white_card_header">
                <div class="box_header m-0">
                  <div class="main-title">
                    <h3 class="m-0">List News</h3>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button
                    class="btn_1"
                    onClick={() => navigate("/dashboard/news/addNews")}
                  >
                    Join News
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    class="btn_1"
                    onClick={handleRefreshClickUnitedNations}
                  >
                    Join News United Nations
                  </Button>
                  &nbsp;&nbsp;
                  <Button class="btn_1" onClick={handleRefreshClickBBC}>
                    Join News BBC
                  </Button>
                </div>
              </div>
              <div class="white_card_body">
                <div class="QA_section">
                  <div class="QA_table mb_30">
                    <table class="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Author</th>
                          <th scope="col">Description</th>
                          <th scope="col">Image</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsData &&
                          newses &&
                          newses.map((news) => (
                            <tr key={news._id}>
                              <td>{news.title}</td>
                              <td>{news.author}</td>
                              <td>{description(news.description)}</td>
                              <td>
                                {" "}
                                {news.author === "Admin" && (
                                  <Image
                                    src={require(`../../../../server/uploads/images/${news.imageNews}`)}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )}
                                {news.author === "United nations" && (
                                  <Image
                                    src={news.imageNews}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )}
                                {news.author === "BBC" && (
                                  <Image
                                    srcset={news.imageNews}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )}
                              </td>

                              <td>
                                <Button
                                  class="btn_1"
                                  onClick={() => handleViewNews(news._id)}
                                >
                                  View Details
                                </Button>
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
  function handleViewNews(Id) {
    // Navigate to the user details page for the specified user ID
    window.location.href = `/dashboard/news/${Id}`;
  }
  function description(desc) {
    return desc.slice(0, 70) + "...";
  }
}
export default NewsList;
