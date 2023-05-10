import { getUserById } from "BackEnd/Modules/services/userService";
import { projectDetailsSidebar } from "data/projectsArea";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./mission.module.css";
import Modal from "react-modal";

import Popup from "reactjs-popup";
import "react-datepicker/dist/react-datepicker.css";
import { sendEmail } from "BackEnd/Modules/services/missionService";
import AuthService from "services/auth.service";
import { render } from "react-dom";
import EmailEditor from "react-email-editor";
import { useRef } from "react";

const { info, perks } = projectDetailsSidebar;
const MissionDetailsPark = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <div className="project-details-park mt-30 box">
        <h4 className="title">Start Date</h4>
        <span></span>
        <Calendar className={styles.customcalender} defaultValue={startDate} />
      </div>

      <div className="project-details-park mt-30 box">
        <h4 className="title">End Date</h4>
        <span></span>
        <Calendar className={styles.customcalender} defaultValue={endDate} />
      </div>
    </div>
  );
};

const MissionDetailsSidebar = () => {
  const { id } = useParams();

  const [missionData, setMissionData] = useState({
    Title: "",
    Category: "",
    Description: "",
    SkillsRequired: "",
    LanguageRequired: "",
    StartDate: "",
    EndDate: "",
    Location: "",
    Image: "",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [email, setEmail] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");

  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    // console.log('Sono in html');
    // emailEditorRef.current.editor.exportHtml((EmailData) => {
    // const { design, text } = EmailData;
    // console.log('html', emailEditorRef);
    // console.log('Sono in html', setText(text));
    //   setText(text);
    // });
    // const data = emailEditorRef.current.editor.exportHtml();
    // setText(data);
    // sendEmail(data);
  };

  const onReady = () => {
    // editor is ready
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };
  const handleSend = () => {
    sendEmail({ message: emailMessage });
    const EmailData = {
      from,
      email,
      text,
      phone,
    };

    sendEmail(EmailData)
      .then((res) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleSave = () => {
    const EmailData = {
      from,
      email,
      text,
      phone,
    };
    // Save the email data to a server using an API
    fetch("https://volunteerhub-backend.onrender.com/missions/api/sendMail/", {
      method: "POST",
      body: JSON.stringify(EmailData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Close the modal
        const modal = document.getElementById("modal");
        modal.style.display = "none";
      })
      .catch((error) => console.error(error));
  };
  const handleLoad = () => {
    const editorInstance = emailEditorRef.current.editor;
    const data = editorInstance.exportHtml();
    editorInstance.addEventListener("input", handleChange);
    //setText(data);
  };

  const handleDesignLoad = () => {
    const editorInstance = emailEditorRef.current.editor;
    const initialText = editorInstance.exportHtml();
    //setText(initialText);
  };

  const handleChange = () => {
    const editorInstance = emailEditorRef.current.editor;
    // Get the changed text
    const changedText = editorInstance.exportHtml();
    setText(changedText);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const EmailTemplate = () => {
    const handleSend = () => {
      sendEmail({ message: emailMessage });
      const editorInstance = emailEditorRef.current.editor;
      const EmailData = {
        from,
        email,
        text: editorInstance.exportHtml(),
        phone,
      };
      setText(text);
      sendEmail(EmailData)
        .then((res) => {})
        .catch((error) => {
          console.log(error.response.data);
        });
    };

    return (
      <div
        contentEditable={true}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
          lineHeight: "1.5",
          fontSize: "16px",
        }}
        onInput={(e) => setEmailMessage(e.currentTarget.innerHTML)}
      ></div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://volunteerhub-backend.onrender.com/missions/${id}`
      );
      const data = await response.json();
      setMissionData(data);
      window.myId = data.AddedBy;
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (missionData.StartDate && missionData.EndDate) {
      const start = new Date(missionData.StartDate);
      const end = new Date(missionData.EndDate);
      setStartDate(start);
      setEndDate(end);
    }
  }, [missionData.StartDate, missionData.EndDate]);
  useEffect(() => {
    const handleCloseModal = () => {
      setModalIsOpen(false);
    };

    getUserById(window.myId)
      .then((res) => {
        if (res) {
          const user = res;

          setFirstName(res.firstName);
          setLastName(res.lastName);
          setImage(res.image);
          setEmail(res.email);
          const currentUser = AuthService.getCurrentUser();
          setFrom(currentUser.email);
          setPhone(currentUser.phone);
        }
      })
      .catch((error) => console.log(error));
  }, [window.myId]);

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };
  const images = importAll(
    require.context("../../../assets/images", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="project-details-sidebar">
      <button className={styles.bouton} onClick={() => setModalIsOpen(true)}>
        <i className="fa-regular fa-envelope mr-10"></i> Contact
      </button>

      <div className="project-details-info mt-70 box">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: "1000",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "400px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              padding: "20px",
            },
          }}
          ariaHideApp={false}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            <p>
              We encourage you to reach out to our mission responsible by
              sending an email to learn more about our mission and how you can
              get involved.
            </p>
            <p className="mb-15">
              {" "}
              We welcome your participation and look forward to hearing from
              you.
            </p>
            <div>
              {/* <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div> */}

              {/* <EmailEditor ref={emailEditorRef} onReady={onReady} onLoad={handleLoad} onDesignLoad={handleDesignLoad} onChange={(e) => setText({text: e.target.value })}
/> */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon">
                    <i className="fas fa-pencil-alt prefix"></i>
                  </span>
                </div>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button
              className="mt-15 center"
              onClick={() => {
                handleSave();
                setModalIsOpen(false)();
              }}
            >
              Submit
            </button>
          </div>
        </Modal>

        <h4 className="pb-30"> Added By</h4>
        <div className="info">
          <img
            src={images["profilepicture.jpg"]}
            alt=""
            className="mr-100"
            style={{ width: "100px", height: "100px" }}
          />
          {/* {image && <img src={image} alt="" className="mr-100" style={{ width: '100px', height: '100px', }} />} */}
          <h5 className="title ml-30">{firstName} </h5>
          <h5 className="title ml-30">{lastName}</h5>
          <span></span>
        </div>
      </div>

      {startDate && endDate && (
        <>
          <div className="project-details-park mt-30 box">
            <h4 className="title">Start Date</h4>
            <span></span>
            <Calendar
              className={styles.customcalendar}
              defaultValue={startDate}
            />
          </div>

          <div className="project-details-park mt-30 box">
            <h4 className="title">End Date</h4>
            <span></span>
            <Calendar
              className={styles.customcalendar}
              defaultValue={endDate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MissionDetailsSidebar;
