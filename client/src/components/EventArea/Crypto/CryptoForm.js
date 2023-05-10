import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "components/Reuseable/Title";
import EventService from "services/event.service";

const startPayment = async ({ setError, setTxs, ether, addr, org, user, event, join }) => {

console.log(user)

  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    if (tx) {
      Participate(user, event)
      join(true)
    }
  } catch (err) {
    setError(err.message);
    join(false)
  }
};
function Participate(userId, eventId) {
  EventService.follow(userId, eventId).then(
    (response) => { },
    (error) => { }
  );
}
const CryptoForm = ({ address = {}, amount = {}, org = {}, user = {}, event = {}, join = {} }) => {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);



  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData(e.target);

    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
      org,
      user,
      event,
      join
    });
  };
  return (
    <section >
      <Container>
        <Row className="justify-content-center text-center">
          <h2> Proceed to Payment</h2>
          <Col lg={12}>
            <form form className="m-4 mx-auto" onSubmit={handleSubmit} id="contact-form">
              <div className="conact-form-item mx-auto">
                <Col lg={12}>
                  <div className="input-box mt-20 mx-auto">
                    <h5>{org}'s Wallet address</h5>
                    <input style={{
                      width: "38rem",
                      fontSize: "x-large",
                      textAlign: "center"
                    }}
                      type="text"
                      name="addr"
                      value={address}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="input-box mt-20 mx-auto">
                    <h5>Amount</h5>
                    <input style={{
                      width: "8rem",
                      fontSize: "x-large",
                      textAlign: "center"
                    }}
                      name="ether"
                      type="text"
                      value={amount}
                    />
                    <span style={{
                      fontSize: "1.2rem",
                      position: "relative",
                      top: "0.1rem"
                    }}>
                      ETH</span>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="input-box mt-20 text-center mx-auto">
                    <button className="main-btn" type="submit">
                      Confirm
                    </button>
                    <ErrorMessage message={error} />
                    <TxList txs={txs} />
                  </div>
                </Col>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default CryptoForm;
