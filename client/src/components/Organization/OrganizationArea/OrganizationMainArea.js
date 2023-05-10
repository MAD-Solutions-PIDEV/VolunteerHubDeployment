import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import OrganizationItem from "./OrganizationItem";
import OrganizationService from "services/organizationService";
import SearchBox from "react-search-box";
import CountryDropdown from "./CountryDropdown";
import AddressService from "services/addressService";

const OrganizationMainArea = ({ className = "", count = 3 }) => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [displayCount, setDisplayCount] = useState(count);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSdg, setSelectedSdg] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const sdgs = [
    { name: "sdg_0", imageUrl: "http://localhost:4000/uploads/sdgs/SDG1.png" },
    { name: "sdg_1", imageUrl: "http://localhost:4000/uploads/sdgs/SDG2.png" },
    { name: "sdg_2", imageUrl: "http://localhost:4000/uploads/sdgs/SDG3.png" },
    { name: "sdg_3", imageUrl: "http://localhost:4000/uploads/sdgs/SDG4.png" },
    { name: "sdg_4", imageUrl: "http://localhost:4000/uploads/sdgs/SDG5.png" },
    { name: "sdg_5", imageUrl: "http://localhost:4000/uploads/sdgs/SDG6.png" },
    { name: "sdg_6", imageUrl: "http://localhost:4000/uploads/sdgs/SDG7.png" },
    { name: "sdg_7", imageUrl: "http://localhost:4000/uploads/sdgs/SDG8.png" },
    { name: "sdg_8", imageUrl: "http://localhost:4000/uploads/sdgs/SDG9.png" },
    { name: "sdg_9", imageUrl: "http://localhost:4000/uploads/sdgs/SDG10.png" },
    {
      name: "sdg_10",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG11.png",
    },
    {
      name: "sdg_11",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG12.png",
    },
    {
      name: "sdg_12",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG13.png",
    },
    {
      name: "sdg_13",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG14.png",
    },
    {
      name: "sdg_14",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG15.png",
    },
    {
      name: "sdg_15",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG16.png",
    },
    {
      name: "sdg_16",
      imageUrl: "http://localhost:4000/uploads/sdgs/SDG17.png",
    },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleOnSearch = (value) => {
    setSearchQuery(value);
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + count);
  };

  const handleCountrySelect = async (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };

  const handleSDGClick = (sdg) => {
    setSelectedSdg(sdg);
    //console.log(selectedSdg);
  };

  useEffect(() => {
    async function fetchOrganizations() {
      const organizationsList =
        await OrganizationService.getListOfActiveOrganizations();
      setOrganizations(organizationsList);
    }

    fetchOrganizations();
  }, []);

  useEffect(() => {
    async function filterOrganizations() {
      //console.log(selectedCountry);

      const filtered = await Promise.all(
        organizations.map(async (org) => {
          //console.log(org.sdg_classification);
          if (!org.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }
          const address = await AddressService.getAddressById(org.address);
          if (selectedCountry && address.country !== selectedCountry) {
            return false;
          }
          if (
            selectedSdg &&
            !org.sdg_classification.includes(selectedSdg.name)
          ) {
            return false;
          }
          return true;
        })
      ).then((filteredOrgs) => {
        return organizations.filter((_org, index) => filteredOrgs[index]);
      });
      setFilteredOrganizations(filtered);
      setDisplayCount(count);
    }
    filterOrganizations();
  }, [organizations, searchQuery, selectedCountry, selectedSdg, count]);

  return (
    <div className={`team-main-area ${className}`}>
      <Container>
        <div>
          <SearchBox
            placeholder="Search Organizations"
            value={searchQuery}
            data={organizations}
            onChange={handleOnSearch}
            inputBackgroundColor="#f7f7f9"
            inputHeight="70px"
            inputBorderColor="#f7f7f9"
          />
        </div>
        <div>
          <h4 onClick={toggleFilters}>
            Filters <i className="fa fa-regular fa-filter"></i>
          </h4>
          {showFilters && (
            <div>
              <h4>Filter by Country</h4>
              <CountryDropdown onSelect={handleCountrySelect} />
              <h4>Filter by SDG</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {sdgs.map((sdg) => (
                  <div
                    key={sdg.name}
                    onClick={() => handleSDGClick(sdg)}
                    className="mx-1 my-1"
                  >
                    <img
                      className="img-fluid"
                      style={{ width: "5rem" }}
                      src={sdg.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Row className="justify-content-center">
          {filteredOrganizations.slice(0, displayCount).map((org) => (
            <OrganizationItem key={org._id} organization={org} />
          ))}
        </Row>
        <div className="text-center mt-20">
          {filteredOrganizations.length > displayCount && (
            <button className="main-btn" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default OrganizationMainArea;
