import { createContext, useReducer } from "react";

const initialState = {
  phoneLocked: true,
  openApps: [],
  displayPopup: false,
  popupContent: {},
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

  const value = {
    phoneLocked: state.phoneLocked,
    openApps: state.openApps,
    displayPopup: state.displayPopup,
    popupContent: state.popupContent,

    setPhoneLocked,
    setOpenApps,
    setDisplayPopup,
    setPopupContent,
  };

  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
};

export { PhoneContext, PhoneProvider };
