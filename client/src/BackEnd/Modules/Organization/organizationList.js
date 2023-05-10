import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import OrganizationService from "../../../services/organizationService";
import { getUserById } from "../services/userService";

function DashboardOrganizationsList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizationsWithOwners = async () => {
      const organizations =
        await OrganizationService.getListOfAllOrganizations();
      const organizationsWithOwners = await Promise.all(
        organizations.map(async (organization) => {
          let owner = {};
          if (organization.owner) {
            owner = await getUserById(organization.owner);
          }
          return { ...organization, owner };
        })
      );
      setOrganizations(organizationsWithOwners);
    };

    fetchOrganizationsWithOwners();
  }, []);

  const handleStatusChange = async (orgId, newStatus) => {
    try {
      if (newStatus === "active") {
        await OrganizationService.activateOrganization(orgId);
      } else if (newStatus === "inactive") {
        await OrganizationService.deactivateOrganization(orgId);
      } else if (newStatus === "blocked") {
        await OrganizationService.blockOrganization(orgId);
      }
      const updatedOrganizations =
        await OrganizationService.getListOfAllOrganizations();
      setOrganizations(updatedOrganizations);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
      cell: (row) => {
        if (Object.keys(row.owner).length > 0) {
          return `${row.owner.firstName} ${row.owner.lastName}`;
        }
        return "";
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        if (row.status === "archived") {
          return <span>Archived</span>;
        }
        return (
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row._id, e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="archived">Archived</option>
          </select>
        );
      },
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status === "archived",
      style: {
        backgroundColor: "#ffcccc",
      },
    },
  ];

  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">Organizations</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                {organizations.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={organizations}
                    pagination
                    highlightOnHover
                    conditionalRowStyles={conditionalRowStyles}
                  />
                ) : (
                  <p>Loading organizations...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardOrganizationsList;
