import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";

const Terms = () => {
  return (
    <Layout>
      <Header />
      <PageTitle title="Terms" parent="terms" />
      <section className="faq-design-area pb-120">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="tab-content mt-55" id="pills-tabContent">
              {tabPane.map((tab) => (
                <SingleTab key={tab.id} tab={tab} current={current} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Layout>
  );
};

export default Terms;
