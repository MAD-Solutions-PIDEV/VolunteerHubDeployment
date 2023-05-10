import SearchIcon from "components/Header/SearchIcon";
import { blogDetailsMain } from "data/newsArea";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Image, ProgressBar, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EventService from "services/event.service";
import handleSubmit from "utils/handleSubmit";
import Modal from "react-modal";
import CryptoForm from "../Crypto/CryptoForm";

const { tags, socials } = blogDetailsMain;

const BlogDetailsMain = () => {
  let initialized = false;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");
  const name = queryParams.get("name");
  const [event, setEvent] = useState("");
  const [join, setJoin] = useState();
  const [badWord, setBadWord] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [messagecomments, setMessagecomments] = useState([]);
  const [nbParticipants, setNbParticipants] = useState([]);
  const [price, setPrice] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const sdgs = event?.sdgs?.map((sdg) => sdg.name) ?? [];
  let eventId = event?._id;
  let amount = event?.price;
  let address = "";
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [etherAmount, setEtherAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${event?.location[0]?.country}`
        );
        const data = await response.json();
        setCurrencies(data.currencies[0]?.code);
        const responsee = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${currencies}&tsyms=ETH`
        );
        const dataa = await responsee.json();
        setExchangeRate(dataa.ETH);
        setEtherAmount((amount * exchangeRate).toFixed(7));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [event]);

  const onSubmit = (data) => {
    setMessage(data.message);
    EventService.comment(eventId, user.id, data.message).then(async (res) => {
      if (res == "badWord") {
        setBadWord(true);
      } else {
        setBadWord(false);
      }
      console.log("res", res);
      FetchComments(id);
    });
  };

  function FetchComments(id) {
    // Retrive Comments list
    fetch(`http://localhost:4000/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error(error));
  }

  // Retrive Event list
  useEffect(() => {
    if (!initialized) {
      initialized = true;
      fetch(`http://localhost:4000/event/${id}`)
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .catch((error) => console.error(error));
      setNbParticipants(event?.nbParticipant);
      setPrice(event.price);
      setSubscribe(event.subscribe);
      document.title = event?.name;
      FetchComments(id);
    }
  }, [id, user]);

  const { participants } = event;
  let members = "";
  let totalParticipations = 0;
  let firstName = "";
  let lastName = "";
  let image = "";
  let otherParticipantsCount = "";
  if (participants && participants.length > 0) {
    // Retrive first participant
    const firstParticipant = participants[0];
    firstName = firstParticipant.firstName;
    lastName = firstParticipant.lastName;
    image = firstParticipant.image;

    // Count rest participants
    otherParticipantsCount = participants.length - 1;
    totalParticipations =
      Math.trunc((participants.length / nbParticipants) * 100) || "";
  } else {
  }
  if (firstName && lastName) {
    members =
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1);
    if (otherParticipantsCount == 0) {
    } else {
      members = members + " and " + otherParticipantsCount + " participated";
    }
  } else {
    members = "Be the first one to join";
  }

  let organizationId = event.organization?._id;
  //Visit profile Organization
  const profileOrg = (event) => {
    navigate(`/organization/details/${organizationId}`);
  };

  useEffect(() => {
    if (user) {
      EventService.check(user.id, id).then(
        (response) => {
          if (response.data.message === "true") {
            setJoin(false);
          } else {
            setJoin(true);
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
    }
  }, []);

  const handleLike = (event) => {
    if (user) {
      if (totalParticipations < 100) {
        if (subscribe == "free") {
          EventService.follow(user.id, id).then(
            (response) => {
              // console.log(response.data)
              if (response.data.message === "true") {
                setJoin(true);
              } else {
                setJoin(false);
              }
            },
            (error) => {
              // console.log(error);
            }
          );
        } else {
          if (!join) {
            setShowModal(true);
          } else {
            setJoin(false);
          }
        }
      } else {
        alert("We reach maximum number of participants! ");
      }
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col style={{ width: "50%" }}>
        <div className="blog-details__main">
          <div className="blog-details__image">
            <Image
              src={`http://localhost:4000/uploads/${event.image}`}
              alt=""
              fluid
            />
          </div>
          <div className="blog-details__content">
            <span>{new Date(event.startDate).toLocaleDateString()}</span>
            <div className="blog-one__meta">
              <Link to={`/organization/details/${organizationId}`}>
                <i className="fa fa-user-o"></i>
                {event ? event.organization?.name : "Loading..."}
              </Link>
              <a href="#">
                <i className="fa fa-comments-o"></i> {comments.length} comments
              </a>
            </div>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
          </div>
          <div className="blog-details__meta">
            <div className="blog-details__tags">
              <span>ORGANIZATION: </span>
              {/* <p>First participant: {firstName} {lastName}</p>
              <p>Other participants count: {otherParticipantsCount}</p> */}
            </div>
            <div className="blog-details__share">
              <ul>
                <li>
                  <a
                    href={`https://www.facebook.com/sharer.php?href=${window.location.href}`}
                    target="_blank"
                  >
                    <i className="fa fa-facebook-square"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="blog-author">
          <div className="blog-author__image">
            <Image
              src={`http://localhost:4000/uploads/${
                event ? event.organization?.logo : "Loading..."
              }`}
              alt={event ? event.organization?.name : "Loading..."}
              style={{ width: "22px" }}
            />
          </div>
          <div className="blog-author__content">
            <h3>{event ? event.organization?.name : "Loading..."}</h3>
            <p>{event ? event.organization?.description : "Loading..."} </p>
          </div>
        </div>
        <div className="comment-one">
          <h3 className="comment-one__block-title">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => {
            const imageSource = comment.user.image
              ? `http://localhost:4000/uploads/${comment.user.image}`
              : comment.user.gender === "male"
              ? "assets/img/avatar/men.png"
              : "assets/img/avatar/women.png";
            return (
              <div className="comment-one__single">
                <div className="comment-one__image">
                  <Image src={imageSource} alt="" style={{ width: "6rem" }} />
                </div>
                <div className="comment-one__content">
                  <h3>
                    {comment.user.username}{" "}
                    <span className="comment-one__date">
                      {comment?.creationDate?.substring(0, 10)} |{" "}
                      {comment?.creationDate?.substring(11, 16)}{" "}
                    </span>
                  </h3>
                  <p>{comment.message}</p>
                </div>
                <div className="blog-btn"></div>
              </div>
            );
          })}
        </div>
        <div className="comment-form me-1">
          <h3 className="comment-one__block-title">Leave a Comment</h3>
          <form
            style={{
              padding: "0rem 0rem",
              display: "flex",
              alignItems: "stretch",
            }}
            onSubmit={handleSubmit(onSubmit)}
            className="contact-one__form"
          >
            <Row>
              <Col lg={12}>
                <div className="input-box">
                  <textarea
                    placeholder="Write Comment"
                    name="message"
                  ></textarea>
                </div>
              </Col>
              <Col lg={12} className="text-left">
                <div className="input-box">
                  <button type="submit" className="main-btn">
                    Submit comment
                  </button>
                </div>
                {badWord ? (
                  <div className="alert alert-danger mt-5">
                    <div className="flex-1">
                      <label>Bad words</label>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </form>
        </div>
      </Col>
      <Col lg={4} md={6} sm={7}>
        <div className="sidebar1">
          <div className="sidebar__single sidebar__category">
            <h3 className="sidebar__title">Participants</h3>
            <ul className="sidebar__category-list">
              {members}
              <br />
              {user ? (
                join ? (
                  <a onClick={handleLike} class="main-btn-partcipating">
                    Participating
                  </a>
                ) : (
                  <a onClick={handleLike} class="main-btn">
                    Participate
                  </a>
                )
              ) : (
                <a onClick={handleLike} class="main-btn">
                  Participate
                </a>
              )}
              <div
                style={{
                  right: "1rem",
                  position: "relative",
                  top: "2rem",
                }}
              >
                <ProgressBar
                  now={totalParticipations}
                  label={`${totalParticipations}%`}
                  style={{
                    backgroundColor: "rgb(219 219 219);",
                    color: "black",
                  }}
                />
              </div>
            </ul>
            <Modal
              isOpen={showModal}
              onRequestClose={handleCloseModal}
              contentLabel={
                <div className="d-flex justify-content-between align-items-center">
                  <span>Popup Title</span>
                  <button className="btn btn-link" onClick={handleCloseModal}>
                    dfgdfgdfg
                  </button>
                </div>
              }
              style={{
                overlay: {
                  zIndex: 9999,
                },
                content: {
                  width: "53rem",
                  height: "35rem",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
            >
              <button onClick={handleCloseModal}>Close</button>
              {etherAmount ? (
                <CryptoForm
                  address={event.organization?.wallet}
                  amount={etherAmount}
                  org={event.organization?.name}
                  user={user?.id}
                  event={id}
                  join={setJoin}
                />
              ) : (
                <p>loading</p>
              )}
            </Modal>
          </div>
          <div className="sidebar__single sidebar__post">
            <h3 className="sidebar__title">Sustainable Development</h3>
            <div className="sidebar__post-wrap">
              <div className="sidebar__post__single">
                <div className="sidebar__post-image">
                  <div className="inner-block">
                    <table>
                      <tbody>
                        {sdgs ? (
                          <tr>
                            {sdgs.map((sdg, index) => (
                              <td style={{ padding: "0 15px" }} key={index}>
                                <Image
                                  src={`http://localhost:4000/uploads/sdgs/${sdg.trim()}.png`}
                                  alt={sdg.trim()}
                                />
                              </td>
                            ))}
                          </tr>
                        ) : (
                          <tr>
                            <td>Loading...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="sidebar__post-content">
                  <h4 className="sidebar__post-title"></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default BlogDetailsMain;
