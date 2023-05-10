import icon from "assets/images/header-icon.png";
import logo2 from "assets/images/logo-2.png";
import logo from "assets/images/logo.png";

const storedId = localStorage.getItem("storedId");
var viewprofile = Boolean(false);
if (storedId === "" || storedId == null) {
  viewprofile = false;
} else viewprofile = true;
let v = viewprofile;

export const navItems = [
  {
    id: 1,
    name: "Find a host",
    href: "/hostlist",
  },
  {
    id: 2,
    name: "News",
    href: "/news",
  },
  {
    id: 4,
    name: "Organizations",
    href: "",
    subNavItems: [
      { id: 1, name: "Organizations List", href: "/organization/all" },
      {
        id: 2,
        name: "Add Organization",
        href: "/organization/addOrganization",
      },
    ],
  },

  {
    id: 5,
    name: "Missions",
    href: "",
    subNavItems: [
      { id: 1, name: "Find a Mission", href: "/category" },
      {
        id: 2,
        name: "Add A Mission",
        href: "/addmission",
      },
    ],
  },

  {
    id: 6,
    name: "Campaigns",
    href: "/campaigns",
  },
  {
    id: 7,
    name: "Events",
    href: "/events",
  },
];

export const socials = [
  {
    id: 1,
    icon: "",
    href: "#",
  },
  {
    id: 2,
    icon: "",
    href: "#",
  },
  {
    id: 3,
    icon: "",
    href: "#",
  },
  {
    id: 4,
    icon: "",
    href: "#",
  },
];

const headerData = {
  logo,
  logo2,
  icon,
  navItems,
  email: "volunteerhub.madsolutions@gmail.com",
  phone: "+216 70 250 000 ",
  address: " Pôle Technologique - El Ghazala- 2083. Tunis, Tunisie",
  socials,
};

export default headerData;
