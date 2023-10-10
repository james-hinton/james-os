import {
  NotesOutlined,
  MusicNoteOutlined,
  PhoneOutlined,
  TranslateOutlined,
  TerrainOutlined,
  ThreeDRotationOutlined,
  WorkOutlineOutlined,
  Twitter,
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
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Music",
    iconHref: "/assets/icons/music.png",
    label: "Music",
    href: "/music",
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
    component: <Settings />,
  },
  {
    name: "Terminal",
    icon: <TerminalIcon />,
    label: "Terminal",
    component: <Terminal />,
  },
];

export const SecondPage = [
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
  {
    name: "Twitter",
    iconHref: "/assets/icons/twitter.png",
    label: "Twitter",
    href: "/twitter",
  },
];

export const ThirdPage = [
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
  },
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
  },
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
  },
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
  },
  {
    name: "CV",
    icon: <NotesOutlined />,
    label: "CV",
    href: "/cv",
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
