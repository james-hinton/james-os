import { lazy } from "react";

import {
  NotesOutlined,
  PhoneOutlined,
  ThreeDRotationOutlined,
  Terminal as TerminalIcon,
  Email,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Widgets
import WeatherWidget from "./components/Widgets/Weather/Weather";
import GalleryWidget from "./components/Widgets/Gallery/Gallery";

// Apps
import Settings from "../../apps/Settings/Settings";
import Terminal from "../../apps/Terminal/Terminal";
import Resume from "../../apps/Resume/Resume";

const Twitter = lazy(() => import("../../apps/Twitter"));
const Soundcloud = lazy(() => import("../../apps/Soundcloud"));
const PrimevalTraces = lazy(() => import("../../apps/PrimevalTraces"));
const Project = lazy(() => import("../../apps/Project"));

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
    name: "Translate",
    iconHref: "/assets/icons/translate.png",
    label: "Translate",
    href: "/translate",
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
  {
    name: "Ordnance Survey",
    iconHref: "/assets/icons/os.png",
    label: "Ordnance Survey",
    component: (props) => (
      <Project
        title="Ordnance Survey"
        description="Description for Ordnance Survey"
        image="/assets/projects/os.png"
        link="https://www.ordnancesurvey.co.uk/"
        github="https://github.com"
        tech={["React", "Node.js", "PostgreSQL"]}
        about="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl
        nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl nec nisl"
        {...props}
      />
    ),
    width: "50%",
    height: "70%",
  },
  {
    name: "Satellite Applications",
    iconHref: "/assets/icons/satapps.png",
    label: "Satellite Applications Catapult",
  },
  {
    name: "Spatial Days",
    iconHref: "/assets/icons/spatialdays.png",
    label: "Spatial Days",
  },
  {
    name: "Yeti",
    iconHref: "/assets/icons/yeti.png",
    label: "Yeti",
  },
  {
    name: "Whoovr",
    iconHref: "/assets/icons/whoovr.png",
    label: "Whoovr",
  },
  {
    name: "Requiem",
    iconHref: "/assets/icons/requiem.png",
    label: "Requiem",
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
    name: "Phone",
    icon: <PhoneOutlined />,
    href: "/phone",
  },
  {
    name: "Email",
    icon: <Email />,
    href: "/email",
  },
];
