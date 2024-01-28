import { lazy } from "react";

import {
  NotesOutlined,
  PhoneOutlined,
  ThreeDRotationOutlined,
  Terminal as TerminalIcon,
  Email,
  Code as CodeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Widgets
import WeatherWidget from "./components/Widgets/Weather/Weather";
import GalleryWidget from "./components/Widgets/Gallery/Gallery";

// Data
import postsData from "../../apps/Blog/posts.json";

// Apps
import Terminal from "../../apps/Terminal/Terminal";
import Resume from "../../apps/Resume/Resume";
import Contact from "../../apps/Contact/Contact";
import ExternalLink from "../../apps/ExternalLink/ExternalLink";

const Twitter = lazy(() => import("../../apps/Twitter"));
const Soundcloud = lazy(() => import("../../apps/Soundcloud"));
const PrimevalTraces = lazy(() => import("../../apps/PrimevalTraces"));
const Project = lazy(() => import("../../apps/Project"));
const Room = lazy(() => import("../../apps/Room"));
const Bar = lazy(() => import("../../apps/Bar"));
const Blog = lazy(() => import("../../apps/Blog"));

export const HomeApps = [
  {
    widget: <WeatherWidget />,
    width: 2,
  },
  {
    widget: <GalleryWidget />,
    width: 2,
  },
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
    component: Resume,
    height: "80%",
    width: "80%",
  },
  {
    name: "Music",
    iconHref: "/assets/icons/music.png",
    label: "Music",
    component: Soundcloud,
    width: "70%",
    height: "70%",
    backgroundColor: "white",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    component: Twitter,
    width: "80%",
    height: "70%",
    backgroundColor: "white",
  },

  {
    name: "Bar",
    iconHref: "/assets/icons/mix.png",
    label: "Bar",
    href: "/translate",
    component: Bar,
    width: "10%",
    height: "81%",
  },
  {
    name: "Paleontology",
    iconHref: "/assets/icons/fossils.png",
    label: "Fossils",
    href: "/paleontology",
    component: PrimevalTraces,
    width: "80%",
    height: "70%",
  },
  {
    name: "3D Room",
    iconHref: "/assets/icons/room.png",
    label: "3D",
    href: "/3droom",
    component: Room,
    width: "30%",
    height: "70%",
  },
  {
    name: "Terminal",
    icon: <TerminalIcon />,
    label: "Terminal",
    component: Terminal,
  },
];

export const SecondPage = [
  // Ordnance Survey
  {
    name: "Ordnance Survey",
    iconHref: "/assets/icons/os.png",
    label: "Ordnance Survey",
    component: (props) => (
      <Project
        title="Ordnance Survey"
        description="Full Stack Developer"
        image="/assets/projects/os.png"
        link="https://www.ordnancesurvey.co.uk/"
        github="https://github.com/SpatialDays/stac-portal-frontend"
        tech={["React", "Kubernetes", "Azure", "Django"]}
        about="As a Full Stack Developer for Ordnance Survey, I specialized in enhancing and customizing open-source Spatio-Temporal Asset Catalog (STAC) software. My role involved orchestrating a robust infrastructure for satellite data management for the entirety of Ordnance Survey's geo-spatial assets, deploying the entire system using Kubernetes, Terraform, and Azure."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Commonsensing
  {
    name: "CommonSensing",
    iconHref: "/assets/icons/commonsensing.png",
    label: "CommonSensing",
    component: (props) => (
      <Project
        description="Geospatial Developer"
        image="/assets/projects/ipp-commonsensing-logo.png"
        link="https://projects.csopenportal.co.uk/"
        github="https://github.com/SatelliteApplicationsCatapult"
        tech={["Python", "JavaScript", "Satellite Technology"]}
        about="In my role as Lead Developer for the £9.6m IPP CommonSensing project, I employed Python, JavaScript, and other open-source technologies to improve climate resilience in the Pacific Islands through satellite technology. This project required innovative thinking and complex problem-solving to develop solutions that could make a real difference in vulnerable regions."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Yemen Economic Tracking Initiative
  {
    name: "Yeti",
    iconHref: "/assets/icons/yeti.png",
    label: "Yemen Economic Tracking Initiative",
    component: (props) => (
      <Project
        description="Senior Engineer"
        image="/assets/projects/yeti.svg"
        link="https://www.yeti.org/"
        tech={["JQuery", "Django", "AWS"]}
        about="As the leading contributor to the YETI platform's GitHub repository, I enhanced economic analysis tools for Yemen, supported by key international organizations. My expertise in JQuery, Django, HTML, CSS, and AWS formed the backbone of our web modules and data systems, providing crucial insights into Yemen's economic situation."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // UK Centre for Ecology and Hydrology
  {
    name: "UK Centre for Ecology and Hydrology",
    iconHref: "/assets/icons/spatialdays.png",
    label: "UK Centre for Ecology and Hydrology",
    component: (props) => (
      <Project
        description="Software Engineer"
        image="/assets/projects/ceh.png"
        link="https://www.ceh.ac.uk/city-explorer"
        tech={["Azure", "React", "Django"]}
        about="At the UK Centre for Ecology and Hydrology, I'm currently upgrading the City Explorer Toolkit from an MVP (written in R-Shiny) to a more stable, robust build. This redevelopment aims to enhance the tool's functionality in guiding urban planners to strategically allocate green and blue spaces, using comprehensive environmental and demographic data."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Whoovr
  {
    name: "Whoovr",
    iconHref: "/assets/icons/whoovr.png",
    label: "Whoovr",
    component: (props) => (
      <Project
        description="Software Developer"
        image="/assets/projects/whoovr.jpg"
        tech={["Python Flask", "AWS", "Node"]}
        about="As the Sole Software Developer for Whoovr, I was responsible for a company information web service and API for Ergo Digital Ltd. My work involved detailed design, AWS infrastructure setup/configuration, Python Flask back-end application development, and front-end Javascript, JQuery, HTML, CSS, and Jinja2 development."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Requiem
  {
    name: "Requiem",
    iconHref: "/assets/icons/requiem.png",
    label: "Requiem",
    component: (props) => (
      <Project
        title="Requiem"
        description="Software Developer"
        image="/assets/projects/requiem.webp"
        tech={["Python Flask", "AWS", "JavaScript"]}
        about="In my role as a Software Developer for the Requiem Cemetery Management System, I was involved in all aspects from requirements definition and user story documentation to logical and physical database design. My work also included AWS system architecture design and build, back-end development using Python Flask/SQLAlchemy, and front-end development using Bootstrap and JavaScript."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Satellite Applications Catapult
  {
    name: "Satellite Applications Catapult",
    iconHref: "/assets/icons/satapps.png",
    label: "Satellite Applications Catapult",
    component: (props) => (
      <Project
        title="Satellite Applications Catapult"
        description="Geospatial Developer"
        image="/assets/projects/satapps.jpeg"
        link="https://sa.catapult.org.uk/blogs/adopting-stac-to-simplify-geospatial-workflows/"
        github="https://github.com/SpatialDays/stac-portal-frontend"
        tech={["Python", "JavaScript", "Satellite Technology"]}
        about="In my position as a Full Stack Developer at Satellite Applications Catapult, I specialised in enhancing and customising open-source Spatio-Temporal Asset Catalog (STAC) software. My duties involved building a robust infrastructure tailored for satellite data management, integrating React and Django into our technology framework. Additionally, I was responsible for implementing the extensive system using Kubernetes, Terraform, and Azure."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  // Conspirasea
  {
    name: "Conspirasea",
    iconHref: "/assets/icons/conspirasea.png",
    label: "Conspirasea",
    component: (props) => (
      <Project
        description="Software Developer"
        image="/assets/projects/conspirasea.png"
        link="https://conspirasea.net"
        github="https://github.com/SpatialDays/Conspirasea-landing"
        tech={["Satellite Data", "HTML", "Balsamiq"]}
        about="I have been a part of Conspirasea from the start, a project aimed at using satellite data to stop unauthorised vessels from entering marine protected areas in the UK. Our work earned us second place in the Hack the Planet competition."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
];

export const ThirdPage = postsData.posts.map((post) => ({
  name: post.label,
  iconHref: post.iconHref,
  label: post.label,
  component: (props) => (
    <Blog
      title={post.title}
      intro={post.intro}
      sections={post.sections}
      images={post.images}
      {...props}
    />
  ),
  width: "30%",
  height: "70%",
}));

export const DockApps = [
  {
    name: "Contact",
    icon: <Email />,
    label: "Contact",
    component: Contact,
    width: "35%",
    height: "70%",
  },
  {
    name: "Github",
    icon: <CodeIcon />,
    label: "Github",
    component: (props) => (
      <ExternalLink
        message="Are you sure you want to leave the website and see it's code?"
        href="https://github.com/james-hinton/james-os"
        {...props}
      />
    ),
    componentType: ["nobanner", "heightoverride", "noresize", "darkenscreen"],
    width: "70%",
    height: "20%",
  },
];
