import jwtDecode from "jwt-decode"

const getIdStorage = ():string | undefined => {
    try {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return JSON.parse(userData).userId;
        }
    }
    catch (err) {
        console.log(err)
    }
}
export {getIdStorage}