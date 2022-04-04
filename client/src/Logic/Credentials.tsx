const patterns =  {
    firstName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/i,
    lastName: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    password: /^[\w@-]{6,}$/i,
}



const checkRegex = (input: string, type: string):boolean => {
    switch (type) {
        case "first":
            return patterns.firstName.test(input)
        case "last":
            return patterns.lastName.test(input);
        case "email":
            return patterns.email.test(input)
        case "password":
            return patterns.password.test(input)
        default:
            return false;
    }
}
export {checkRegex}