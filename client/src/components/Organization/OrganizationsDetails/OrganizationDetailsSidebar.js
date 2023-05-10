import "../../../../node_modules/flag-icon-css/css/flag-icons.min.css";
import { projectDetailsSidebar } from "data/projectsArea";
import React, { useEffect, useState } from "react";
import { Image, Row, Col } from "react-bootstrap";
import AddressService from "services/addressService";
import OrganizationService from "services/organizationService";
const OrganizationDetailsSidebar = ({ organization }) => {
  const [address, setAddress] = useState();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const adr = await AddressService.getAddressById(organization.address);
        setAddress(adr);
        //console.log(adr)
      } catch (error) {
        // handle error here
      }
    };
    getAddress();
  }, [organization]);
  //console.log(address);
  return (
    <div className="project-details-sidebar">
      <div className="project-details-info mt-70 box">
        <div className="info">
          <Image
            style={{ left: "-10%" }}
            src="http://localhost:3000/assets/img/address.svg"
            alt=""
            width={120}
            height={120}
          />
          <div>
            <div className="ms-20">
              <h5 className="title">
                {address ? address.firstAddress : "Loading..."}
              </h5>

              <h5 className="title">
                {address ? address.state : "Loading..."},{" "}
                {address ? address.zipCode : "Loading..."}
              </h5>
              <h5 className="title"></h5>

              {address && <span>{address.country}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationDetailsSidebar;
