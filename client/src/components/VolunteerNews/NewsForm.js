import { useState } from "react";
import axios from "axios";
import { Col, Container, Row, Form } from "react-bootstrap";
import Title from "components/Reuseable/Title";

function NewsForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageNews", image);

    try {
      const res = await axios.post(
        "https://volunteerhub-backend.onrender.com/news/addNews",
        formData
      );
      console.log("News added:", res.data);
    } catch (error) {
      console.log("Error:", error);
    }
    window.location.href = `/dashboard/news/list`;
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <section className="contact-form-area">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Title tagline="Join News"></Title>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <form onSubmit={handleSubmit} id="contact-form">
              <div className="conact-form-item">
                <Row>
                  <Col>
                    <div className="input-box mt-20">
                      <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="input-box mt-20">
                      <textarea
                        id="#"
                        cols="30"
                        rows="10"
                        placeholder="Description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label>Image:</label>
                      <input type="file" onChange={handleImageChange} />
                    </div>
                    <button type="submit">Submit</button>
                  </Col>
                </Row>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default NewsForm;
