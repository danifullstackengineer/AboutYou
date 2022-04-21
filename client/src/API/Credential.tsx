import $ from "jquery";

const register = async (
  first: string,
  last: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  var result = {
    success: false,
    message: "Something went wrong, please try again.",
  };
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
      result = res;
    })
    .catch((err: any) => {
      result = err;
    });

  return result;
};
const login = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  message: string;
  userData?: { uid: string; token: string; expirationDate: string };
}> => {
  var result = {
    success: false,
    message: "Something went wrong, please try again.",
    userData : {uid: "", token: "", expirationDate: ""}
  };
  await $.ajax({
    url: "/login",
    type: "POST",
    data: {
      email,
      password,
    },
  })
    .then((res: any) => {
      result.success = res.success;
      result.message = res.message;
      if (res.success) {
        result.userData = {uid: res.uid, token: res.token, expirationDate: res.expirationDate }
      }
    })
    .catch((err: any) => {
      result = err;
    });
  return result;
};

const authJWT = async (): Promise<{ success: boolean; message: string }> => {
  var result = {
    success: false,
    message: "Something went wrong while authenticating.",
  };
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
