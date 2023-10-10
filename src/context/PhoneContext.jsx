import { createContext, useReducer } from "react";

const initialState = {
  phoneLocked: true,
  openApps: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PHONE_LOCKED":
      return { ...state, phoneLocked: action.payload };
    case "SET_OPEN_APPS":
      return { ...state, openApps: action.payload };
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

  const value = {
    phoneLocked: state.phoneLocked,
    openApps: state.openApps,

    setPhoneLocked,
    setOpenApps,
  };

  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
};

export { PhoneContext, PhoneProvider };
