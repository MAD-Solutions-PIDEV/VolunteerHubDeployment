import categoriesUser from "assets/images/categories-user.png";
import signIn from "assets/images/singin.png";

export const categoriesSection = {
  bg: require("assets/images/categories-bg.jpg"),
  tagline: "Which Category Interests You",
  title: "Top Categories",
  text: " What kind of exchange are you looking for?",
  categoriesUser,
  signIn,
  categories: [
    {
      id: 1,
      icon: "fa-solid fa-handshake-angle",
      title: "NGO",
    },
    {
      id: 2,
      icon: "fa-solid fa-people-roof",
      title: "Family",
    },
    {
      id: 3,
      icon: "fa-solid fa-graduation-cap",
      title: "School",
    },
    {
      id: 4,
      icon: "fa-sharp fa-solid fa-seedling",
      title: "Nature",
    },
    {
      id: 5,
      icon: "fa-solid fa-users",
      title: "Communities",
    },
    {
      id: 6,
      icon:"fa-solid fa-list-check",
      title: "Sustainable project",
    },
  ],
};
