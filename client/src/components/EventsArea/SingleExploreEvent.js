import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { useState } from "react";
import { useEffect } from "react";
import slugify from "slugify"; // import slugify library
import EventService from "services/event.service";
import { useNavigate } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const SingleExploreEvent = ({ event = {},heartColor = {} }) => {
  const slug = slugify(event.name, { lower: true }); // generate a slug from the event name
  const { image, tagline, date, title, raised } = event;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  let navigate = useNavigate();
  const [heartColors, setHeartColors] = useState("grey");

  let eventId=event._id
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [event.startDate]);

  // Follow / unfollow
  const handleLike = (event) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      console.log(eventId)
      EventService.follow(user.id, eventId).then(
      (response) => {
        console.log(response.data)
        if (response.data.message === "true") {
          heartColors("red");
        } else {
          heartColors("grey");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }else{
    navigate("/login");
  }
  };

  // CountDown event
  function calculateTimeLeft() {
    const difference = new Date(event.startDate) - new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }
  
  const imageStyle = {
      height: '100%',
      objectFit: 'cover'
    };
  return (
    <div className="explore-projects-item mt-30" style={{height:"19rem"}}>
      <Image style={imageStyle} src={(`http://localhost:4000/uploads/${event.image}`)} alt="" fluid  />
      <div className="icon">
        
      <a  onClick={handleLike}>
      <i className="fa fa-heart" style={{color:heartColor}} ></i>
    </a>
      </div>
      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span>Still: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s </span>
          <p>
            
          </p>
        </div>
        <Link href={`/event?id=${event._id}`} state={event}>
        <h3 className="title">{event.name}</h3>
      </Link>
        <div className="projects-range">
          <div className="projects-range-content">
            <ul>
              <li>{event ? event.organization?.name : "Loading..."}</li>
              <li> {event.startDate.substring(0, 10)} | {event.startDate.substring(11, 16)}</li>
            </ul>
          </div>
        </div>
      </div>
      

    </div>
    
  );
};

export default SingleExploreEvent;
