import $ from "jquery";

const register = async (
  first: string,
  last: string,
  email: string,
  password: string
) => {
  await $.ajax({
    url: "/register",
    type: "POST",
    data: {
      first,
      last,
      email,
      password,
    },
  })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
const login = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
  var result = {success: false, message: "Something went wrong, please try again."}
  await $.ajax({
    url: "/login",
    type: "POST",
    data: {
      email,
      password,
    },
  })
    .then((res: any) => {
      if (res.success) {
        localStorage.setItem("token", res.token);
      } 
      result = res;
    })
    .catch((err: any) => {
      result = err;
    });
  return result;
};

const authJWT = async (): Promise<{ success: boolean, message: string }> => {
  var result = {success: false, message: "Something went wrong while authenticating."}
  await $.ajax({
    url: "/isUserAuth",
    type: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res: any) => {
      result = res;
    })
    .catch((res: any) => {
      result = res;
    });
  return result;
};
export { register, login, authJWT };
