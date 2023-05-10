import footerData from "data/siteFooter";
import handleSubmit from "utils/handleSubmit";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import FooterList from "./FooterList";

const { bg, logo, text, author, year, links, socials, text2, shape } =
  footerData;

const SiteFooter = () => {
  const onSubmit = (data) => console.log(data);

  return (
    <footer
      className="footer-area bg_cover"
      style={{ 
        backgroundImage: `url(${bg})`
       }}
    >
      <Container>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <div className="footer-about mt-30">
              <Link href="/">
                <Image src={logo} alt="" />
              </Link>
              <p>{text}</p>
              <ul>
                {socials.map(({ id, icon, href }) => (
                  <li key={id}>
                    <a href={href}>
                      <i className={icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <FooterList title="Join Us" list={links.slice(0, 2)} />
          <FooterList title="Opportunities" list={links.slice(2,4)} />
          <FooterList title="Fundraising" list={links.slice(4,5)} />
          <FooterList title="Actualities" list={links.slice(5,6)} />
        </Row>
        <Row>
          <Col lg={12}>
            <div className="footer-copyright text-center">
              <p>
                © Copyright {year} by {author}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-shape">
        <Image src={shape} alt="" />
      </div>
    </footer>
  );
};

export default SiteFooter;
