import React,{createContext,useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
export const Context=createContext({
  isAuthenticated:true
})

const AppWrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [user,setUser]=useState({})
  const [showLogin,setShowLogin]=useState(null);

  return(
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        showLogin,
        setShowLogin
      }}
    >
      <App/>
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
      <AppWrapper/>
  </BrowserRouter>
  </React.StrictMode>
);
