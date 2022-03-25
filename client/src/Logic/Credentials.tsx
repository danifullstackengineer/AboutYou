const patterns =  {
    firstName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
}


const checkRegex = (input: string, type: string) => {
    switch (type) {
        case "first":
            break;
        case "last":
            break;
        case "username":
            break;
        case "password":
            break;
    }
}
export {checkRegex}