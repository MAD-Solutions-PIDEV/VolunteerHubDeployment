import { Routes, Route } from "react-router-dom";
import Home from "pages/index";
import Home2 from "pages/index-2";
import Home3 from "pages/index-3";
import About from "pages/about";
import Contact from "pages/contact";
//import Update from "pages/update";
import Faq from "pages/faq";
import Projects2 from "pages/projects-2";
import Projects from "pages/projects-1";
import SingleNews from "pages/single-news";
import SingleProject from "pages/single-project";
import TeamMembers from "pages/team-members";
import News from "pages/news";
import GalleryPage from "components/PortfolioArea/GalleryPage";
import Dashboard from "BackEnd/Layout/Dashboard";
import ListUser from "BackEnd/Modules/User/ListUser";
//import UpdateUser from "BackEnd/Modules/User/UpdateUser";
import Buttons from "BackEnd/Layout/Components/Buttons";
import Animate from "BackEnd/Layout/Components/Animate";
import SignupForm from "pages/signupForm";
//import ResetPwd from "pages/ResetPwd";
//import EmailPwd from "pages/emailpwd";
// import FormUserUpdate from "BackEnd/Modules/User/FormUserUpdate";

// import UserProfile from "BackEnd/Modules/User/UserProfile";
import FormUserUpdate from "BackEnd/Modules/User/FormUserUpdate";
import ResetForm from "pages/ResetForm";
import EmailForm from "pages/EmailForm";
import ActivationPage from "pages/activationPage";
import Update from "pages/update";
import Profile from "pages/profile";
import UserDetails from "BackEnd/Modules/User/userDetails";
import Exchange from "pages/exchange";
import Category from "pages/category";
import UpdateHost from "pages/updateHost";
import AddMission from "pages/addMission";
import UpdateMission from "pages/updateMission";
import SingleMission from "pages/singlemission";

import ListEvent from "BackEnd/Modules/Event/ListEvent";
import EventForm from "components/EventArea/EventForm";
import SingleEvent from "components/EventsArea/SingleEvent";
import BlogDetails from "components/EventArea/BlogDetails/BlogDetails";
import OrganizationForm from "pages/organizationForm";
import Pending from "pages/pending";
import OrganizationsList from "pages/organizationsList";
import SingleOrganization from "pages/organizationDetails";
import DashboardOrganizationsList from "BackEnd/Modules/Organization/organizationList";
import ListCampaigns from "BackEnd/Modules/Campaign/ListCampaigns";
import AuthRedirectPage from "pages/auth/token";
import CampaignPage from "pages/newCampaign";
import Campaigns from "pages/allCampaign";
import CampaignDetailspage from "pages/campaignDetailspage";
import UpdateCampaignPage from "pages/UpdateCompaign";
import CampaignDetails from "BackEnd/Modules/Campaign/CampaignDetails";
import ListMission from "BackEnd/Modules/Mission/ListMission";
import Hosts from "pages/hosts";
import DonationCampaign from "pages/campaign";
import StripeWrapper from "components/DonationArea/CheckoutForm";
import DonationCampaignDetailspage from "pages/donationcampaignDetailspage";
import NewsList from "components/VolunteerNews/NewsListPagination";
import NewsListPagination from "components/VolunteerNews/NewsListPagination";

import BlogDetailsNews from "components/VolunteerNews/NewsArea/BlogDetails/BlogDetails";
import NewsForm from "components/VolunteerNews/NewsForm";
import CreatePost from "components/Compition/CreatePost";

import CreateEvent from "pages/createEvent";
import BlogDetailsMain from "components/EventArea/BlogDetails/BlogDetailsMain";
import Rank from "pages/rank";
import Winner from "components/Compition/Winner";
import EventsChart from "components/Organization/OrganizationsDetails/eventsChart";
import PortfolioArea from "components/PortfolioArea/PortfolioArea";

const renderRoutes = () => (
  <Routes>
    <Route path="" element={<Home />} />
    <Route path="/index-2" element={<Home2 />} />
    <Route path="/index-3" element={<Home3 />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/Campaigns" element={<DonationCampaign />} />
    <Route
      path="/donationcampaign/:id"
      element={<DonationCampaignDetailspage />}
    />
    <Route path="/payment/:id" element={<StripeWrapper />} />
    <Route path="/newCampaign" element={<CampaignPage />} />

    <Route path="/CampaignDetails/:id" element={<CampaignDetailspage />} />
    <Route path="/allcampaigns" element={<Campaigns />} />
    <Route path="/updateCampaign/:id" element={<UpdateCampaignPage />} />
    <Route path="/create-post" element={<CreatePost />} />
    <Route path=":id/viewprofile/" element={<Profile />} />
    <Route path=":id/profile" element={<Update />} />

    <Route path=":id/updateMission" element={<UpdateMission />} />

    <Route path="/addmission" element={<AddMission />} />

    <Route path=":id/updatehost" element={<UpdateHost />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/gallery/:id" element={<PortfolioArea />} />
    <Route path="/news" element={<News />} />
    <Route path="/rank" element={<Rank />} />

    <Route path="news/">
      <Route path="" element={<News />} />

      <Route path=":id/" element={<SingleNews />} />
    </Route>
    <Route path="/projects-1" element={<Projects />} />
    <Route path="/events" element={<Projects2 />} />

    <Route path="/exchange/:category" element={<Exchange />} />
    <Route path="/category" element={<Category />} />
    <Route path="/single-news" element={<SingleNews />} />
    <Route path="/single-event" element={<BlogDetails />} />
    <Route path="/single-project" element={<SingleProject />} />
    <Route path="/event" element={<BlogDetails />} />
    <Route path="hostlist" element={<Hosts />} />

    <Route path=":id/single-mission" element={<SingleMission />} />
    <Route path="/team-members" element={<TeamMembers />} />
    <Route path="/create-event" element={<CreateEvent />} />
    <Route path="/competition" element={<Winner />} />
    <Route path="/getNFT" element={<GalleryPage />} />

    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="campaigns/">
        <Route path="list" element={<ListCampaigns />} />
        <Route path=":id/" element={<CampaignDetails />} />
      </Route>

      <Route path="missions/">
        <Route path="list" element={<ListMission />} />
      </Route>
      <Route path="users/">
        <Route path="list" element={<ListUser />} />

        <Route path=":id/" element={<UserDetails />} />
      </Route>
      <Route path="events/">
        <Route path="list" element={<ListEvent />} />
      </Route>
      <Route path="organizations/">
        <Route path="all" element={<DashboardOrganizationsList />} />
      </Route>
      <Route path="componenets/">
        <Route path="buttons" element={<Buttons />} />
        <Route path="animate" element={<Animate />} />
      </Route>
      <Route path="news/">
        <Route path="list" element={<NewsList />} />
        <Route path="lists" element={<NewsListPagination />} />
        <Route path=":id/" element={<BlogDetailsNews />} />
        <Route path="addNews/" element={<NewsForm />} />
      </Route>
    </Route>
    <Route path="/chart" element={<EventsChart />} />

    <Route path="/email" element={<EmailForm />} />
    <Route path="/reset/" element={<ResetForm />} />
    <Route path="/login" element={<SignupForm />} />
    <Route path="/auth" element={<AuthRedirectPage />} />
    <Route path="/organization">
      <Route path="addOrganization" element={<OrganizationForm />} />
      <Route path="pending" element={<Pending />} />
      <Route path="all" element={<OrganizationsList />} />
      <Route path="details/:id" element={<SingleOrganization />} />
    </Route>
    <Route path="/confirm/:activationcode" element={<ActivationPage />} />
  </Routes>
);

export default renderRoutes;
