import React, { useEffect, useState } from 'react';
import './wheel.css';
import { Col, Row } from 'react-bootstrap';

const SpinWheel = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //props.items[selectedItem]


  useEffect(() => {
     selectItem()
  }, [Math.floor(Math.random())])
  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItemIndex = Math.floor(Math.random() * props.items.length);
      if (props.onSelectItem) {
        props.onSelectItem(selectedItemIndex);
      }
      setSelectedItem(selectedItemIndex);
    } else {
      setSelectedItem(null);
      setTimeout(selectItem, 0);
    }
  }

  const wheelVars = {
    '--nb-item': props.items.length,
    '--selected-item': selectedItem,
  };

  const spinning = selectedItem !== null ? 'spinning' : '';

  return (
    <>
<section
        className=" bg_cover about-introduction-area pt-120 pb-120"
        style={{
                backgroundImage: `url(${require("assets/images/page-title-bg.jpg")})`,
          marginTop: " 0px"
        }}
      >
        <Row>
          <Col>

          </Col>
          <div style={{width:"18rem"}}>
          <Col lg={12} style={{align:"center"}}><h3 style={{color:"white",fontSize:"28px"}}>Drop will start after</h3>
            </Col><Col lg={12}><h2 className="glow" style={{color:"white", display: 'flex', fontSize: "40px",
        alignItems: 'center',
        justifyContent: 'center'}}>{countdown}</h2>
          </Col></div>
          <Col>
          
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
          
          </Col>
          <br/>
          <br/>
          <br/>
          <Col lg={7}>
          <div className="wheel-container">
              <div className={`wheel ${spinning}`} style={wheelVars} onClick={selectItem}>
                {props.items.map((item, index) => (

                  <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
          </Col>
          <Col lg={5}> <div style={{
                height: "100%",
                width: " 60%",
                borderRadius: "22px",
                backgroundColor: "#2b36310f"
              }}><div className="promptDiv">
              <form id="imagePrompt"><u> <h3 class="title" style={{color:"white"}}>
            Participants</h3></u>
          {props.items.map((item, index) => (
            <div class="item">
            <h4 class="title" style={{fontColor:"white"}}>{item}</h4>
        </div>
        
            
            
             ))}</form></div></div></Col>
        </Row>


         </section></>
        


  );
}

export default SpinWheel;
