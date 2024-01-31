import { createContext, useReducer } from "react";

const storedBackground = localStorage.getItem("background");
const initialState = {
  phoneLocked: true,
  openApps: [],
  displayPopup: false,
  popupContent: {},
  darkenScreen: false,
  notifications: [
    {
      appName: "Contact",
      eventTrigger: "welcome",
    },
  ],
  background: localStorage.getItem("background") || "background.jpg",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PHONE_LOCKED":
      return { ...state, phoneLocked: action.payload };
    case "SET_OPEN_APPS":
      return { ...state, openApps: action.payload };
    case "SET_DISPLAY_POPUP":
      return { ...state, displayPopup: action.payload };
    case "SET_POPUP_CONTENT":
      return { ...state, popupContent: action.payload };
    case "SET_DARKEN_SCREEN":
      return { ...state, darkenScreen: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "SET_BACKGROUND":
      const newState = { ...state, background: action.payload };
      localStorage.setItem("background", action.payload); // Save to localStorage
      return newState;
    default:
      return state;
  }
}

const PhoneContext = createContext(initialState);

const PhoneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPhoneLocked = (payload) => {
    dispatch({ type: "SET_PHONE_LOCKED", payload });
  };

  const setOpenApps = (payload) => {
    dispatch({ type: "SET_OPEN_APPS", payload });
  };

  const setDisplayPopup = (payload) => {
    dispatch({ type: "SET_DISPLAY_POPUP", payload });
  };

  const setPopupContent = (payload) => {
    dispatch({ type: "SET_POPUP_CONTENT", payload });
  };

  const setDarkenScreen = (payload) => {
    dispatch({ type: "SET_DARKEN_SCREEN", payload });
  };

  const setNotifications = (payload) => {
    dispatch({ type: "SET_NOTIFICATIONS", payload });
  };

  const setBackground = (payload) => {
    dispatch({ type: "SET_BACKGROUND", payload });
  };

  const value = {
    phoneLocked: state.phoneLocked,
    openApps: state.openApps,
    displayPopup: state.displayPopup,
    popupContent: state.popupContent,
    darkenScreen: state.darkenScreen,
    notifications: state.notifications,
    background: state.background,

    setPhoneLocked,
    setOpenApps,
    setDisplayPopup,
    setPopupContent,
    setDarkenScreen,
    setNotifications,
    setBackground,
  };

  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
};

export { PhoneContext, PhoneProvider };
