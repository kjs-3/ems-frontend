import { createContext, useContext, useState } from "react";
import { loginUser } from "../Apis/Api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    //try to read if anything stored in localstorage
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");
    //if any update happends i need to update those valiues
    const [token, setToken] = useState(savedToken);
    const [userName, setUsername] = useState(savedUsername);
    const [role, setRole] = useState(savedRole);
    //from login component this login function will be called
    async function login(username, userpassword) {
        const data = await loginUser(username, userpassword);
        console.log(data);
        //from backend we might got JwtResponse un,token,role
        setToken(data.token);
        setUsername(data.userName);
        setRole(data.role);
        //update in localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.userName);
        localStorage.setItem("role", data.role)
    }
    //incase user(admin/emp) logout
    function logout() {
        setToken(null);
        setUsername(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");

    }
    const isLoggedin = token !== null;
    const isAdmin = role === "ADMIN";
    const sharedData = {
        token: token,
        username: userName,
        role: role,
        isLoggedin: isLoggedin,
        isAdmin: isAdmin,
        login: login,
        logout: logout
    }
    return (
        <>
            <AuthContext.Provider value={sharedData}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
export function useAuth() {
    return useContext(AuthContext);
}