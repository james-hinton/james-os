import { lazy } from "react";

import {
  NotesOutlined,
  PhoneOutlined,
  ThreeDRotationOutlined,
  Terminal as TerminalIcon,
  Email,
  // Code
  Code as CodeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Widgets
import WeatherWidget from "./components/Widgets/Weather/Weather";
import GalleryWidget from "./components/Widgets/Gallery/Gallery";

// Apps
import Settings from "../../apps/Settings/Settings";
import Terminal from "../../apps/Terminal/Terminal";
import Resume from "../../apps/Resume/Resume";
import Contact from "../../apps/Contact/Contact";

const Twitter = lazy(() => import("../../apps/Twitter"));
const Soundcloud = lazy(() => import("../../apps/Soundcloud"));
const PrimevalTraces = lazy(() => import("../../apps/PrimevalTraces"));
const Project = lazy(() => import("../../apps/Project"));
const Room = lazy(() => import("../../apps/Room"));
const Bar = lazy(() => import("../../apps/Bar"));

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
    width: "30%",
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
    icon: <ThreeDRotationOutlined />,
    label: "3D",
    href: "/3droom",
    component: Room,
    width: "80%",
    height: "70%",
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    label: "Settings",
    href: "/projects",
    component: Settings,
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
        github="https://github.com"
        tech={["React", "Kubernetes", "Azure", "Django"]}
        about="As a Full Stack Developer for Ordnance Survey, I specialized in enhancing and customizing open-source Spatio-Temporal Asset Catalog (STAC) software. My role involved orchestrating a robust infrastructure for satellite data management for the entirety of Ordnance Survey's geo-spatial assets, deploying the entire system using Kubernetes, Terraform, and Azure."
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
        link="https://www.satapps.org/"
        github="https://github.com"
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
        // title="Yemen Economic Tracking Initiative"
        description="Senior Engineer"
        image="/assets/projects/yeti.svg"
        link="https://www.yeti.org/"
        github="https://github.com"
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
        link="https://www.ceh.ac.uk/"
        github="https://github.com"
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
        link="https://www.whoovr.com/"
        github="https://github.com"
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
        link="https://www.requiem.com/"
        github="https://github.com"
        tech={["Python Flask", "AWS", "JavaScript"]}
        about="In my role as a Software Developer for the Requiem Cemetery Management System, I was involved in all aspects from requirements definition and user story documentation to logical and physical database design. My work also included AWS system architecture design and build, back-end development using Python Flask/SQLAlchemy, and front-end development using Bootstrap and JavaScript."
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
];

export const ThirdPage = [
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
  {
    name: "Placeholder",
    iconHref: "/assets/icons/placeholder.png",
    label: "Placeholder",
  },
];

export const DockApps = [
  {
    name: "Email",
    icon: <Email />,
    label: "Email",
    component: Contact,
    width: "35%",
    height: "70%",
  },
  {
    name: "Github",
    icon: <CodeIcon />,
    label: "Github",
    href: "https://github.com/james-hinton/james-os",
  },
];
