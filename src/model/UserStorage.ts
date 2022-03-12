import { useCookies } from "react-cookie";

const UserStorage = (function() {

    function getName(): string {
        return localStorage.getItem("name") + "";
    }

    function getEmail(): string {
        return localStorage.getItem("email") + "";
    }

    function getUsername(): string {
        return localStorage.getItem("username") + "";
    }

    function getPfp(): string {
        return localStorage.getItem("profile_picture") + "";
    }

    function getCity(): string {
        return localStorage.getItem("city") + "";
    }

    function setName(name: string) {
        localStorage.setItem("name", name);
    }

    function setEmail(email: string) {
        localStorage.setItem("email", email);
    }

    function setPfp(url: string) {
        localStorage.setItem("profile_picture", url);
    } 

    function setCity(city: string) {
        localStorage.setItem("city", city);
    }

    function setUsername(username: string) {
        localStorage.setItem("username", username);
    }

    function clear() {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profile_picture");
        localStorage.removeItem("city");
        localStorage.removeItem("username");
    }

    function setToken(token: string) {
        const [cookies, setCookie] = useCookies(['access_token']);
        setCookie('access_token', token, { path: '/' });
    }

    function retrieveToken(): string | null {
        return ""
    }

    return {
        getName: getName,
        setName: setName,
        getUsername: getUsername,
        setUsername: setUsername,
        getEmail: getEmail,
        setEmail: setEmail,
        getPfp: getPfp,
        setPfp: setPfp,
        getCity: getCity,
        setCity: setCity
      }
})();

export default UserStorage