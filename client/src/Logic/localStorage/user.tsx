import jwtDecode from "jwt-decode"

const getIdStorage = ():string | undefined => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const tokenP: { id: string, email: string } = jwtDecode(token)
            return tokenP.id;
        }
    }
    catch (err) {
        console.log(err)
    }
}
export {getIdStorage}