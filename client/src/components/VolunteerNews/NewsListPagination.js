import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "react-bootstrap";

function NewsListPagination() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `https://volunteerhub-backend.onrender.com/news?page=${page}`
      );
      setNewsData(response.data);
      setTotalPages(Math.ceil(response.data.total / 12));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "News"; // set new title

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

  const handleDeleteNews = async (id) => {
    try {
      const response = await axios.delete(
        "https://volunteerhub-backend.onrender.com/news/delete/" + id
      );

      console.log(response.data); // logs "news deleted succefully"
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
                                {/* {news.author == "Admin" && (
                                  <Image
                                    src={require(`https://volunteerhub-backend.onrender.com/uploads/images/${news.imageNews}`)}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )} */}
                                {news.author == "United nations" && (
                                  <Image
                                    src={news.imageNews}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )}
                                {news.author == "BBC" && (
                                  <Image
                                    srcset={news.imageNews}
                                    alt="news"
                                    style={{ width: "50px", height: "40px" }}
                                  />
                                )}
                              </td>
                              <td>
                                <tr>
                                  <td>
                                    <Button
                                      class="btn_1"
                                      onClick={() => handleViewNews(news._id)}
                                    >
                                      Details
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      class="btn_2"
                                      onClick={() => handleDeleteNews(news._id)}
                                    >
                                      delete
                                    </Button>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <div class="d-flex justify-content-center">
                        <Pagination>
                          <Pagination.First onClick={() => setCurrentPage(1)} />
                          <Pagination.Prev
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          />
                          {[...Array(totalPages).keys()].map((page) => (
                            <Pagination.Item
                              key={page + 1}
                              active={page + 1 === currentPage}
                              onClick={() => setCurrentPage(page + 1)}
                            >
                              {page + 1}
                            </Pagination.Item>
                          ))}
                          <Pagination.Next
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                          />
                          <Pagination.Last
                            onClick={() => setCurrentPage(totalPages)}
                          />
                        </Pagination>
                      </div>
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
    window.location.href = `/dashboard/news/${Id}`;
  }

  function description(desc) {
    return desc.slice(0, 70) + "...";
  }
}
export default NewsListPagination;
