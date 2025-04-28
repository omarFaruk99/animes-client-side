import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";
// import AuthContext from "../context/AuthContex";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;
