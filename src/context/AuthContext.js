import { createContext, useContext, useReducer, useMemo } from "react";

const AuthContext = createContext(undefined);
const AuthAPIContext = createContext(() => undefined);

const reducer = (state, action) => {
  switch (action.type) {
    case "initClient":
      return { ...state, client: action.client };
    case "setToken":
      return { ...state, token: action.token };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const api = useMemo(() => {
    const onInitClient = (client) => {
      dispatch({ type: "initClient", client });
    };

    const onSetToken = (token) => {
      dispatch({ type: "setToken", token });
    };

    return {
      onInitClient,
      onSetToken,
    };
  }, []);

  return (
    <AuthAPIContext.Provider value={api}>
      <AuthContext.Provider value={state}>
        {children}
      </AuthContext.Provider>
    </AuthAPIContext.Provider>
  );
};

const useAuthContext = () => {
  const accessToken = useContext(AuthContext);
  if (typeof accessToken === "undefined") {
    throw new Error("useAuthContext must be used within a AuthContext");
  }
  return accessToken;
};

const useAuthContextAPI = () => {
  const authContextPI = useContext(AuthAPIContext);
  if (typeof authContextPI === "undefined") {
    throw new Error("useAuthContextPI must be used within a AuthAPIContext");
  }
  return authContextPI;
};

export { AuthContextProvider, useAuthContext, useAuthContextAPI };
