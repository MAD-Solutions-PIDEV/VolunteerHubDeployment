import shape from "assets/images/footer-shape.png";
import logo from "assets/images/logo.png";
export const socials2 = [
  {
    id: 1,
    icon: "fa fa-twitter",
    href: "#",
  },
  {
    id: 2,
    icon: "fa fa-facebook-official",
    href: "#",
  },
  {
    id: 3,
    icon: "fa fa-pinterest",
    href: "#",
  },
  {
    id: 4,
    icon: "fa fa-instagram",
    href: "#",
  },
];

const footerData = {
  logo,
  bg: require("assets/images/footer-bg.jpg"),
  socials: socials2,
  text: "Volunteering: where passion meets purpose.",
    
  links: [
    {
      id: 1,
      text: "Hosts",
      href: "/hostlist",
    },
    {
      id: 2,
      text: "Organizations",
      href: "/organization/all",
    },
  

    {
      id: 3,
      text: "Missions",
      href: "/category",
      
    },
    {
      id: 4,
      text: "Events",
      href: "/events",
      
    },
   
    {
      id: 5,
      text: "Campaigns",
      href: "/campaigns",
      
    },
   
    {
      id: 6,
      text: "News",
      href: "",
    },
   
  ],
  author: "VolunteerHub",
  year: new Date().getFullYear(),
};

export default footerData;
