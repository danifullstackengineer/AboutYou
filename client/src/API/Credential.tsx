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
const login = async (email: string, password: string) => {
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
      } else {
        return res;
      }
    })
    .catch((err: any) => {
      return err;
    });
};

const authJWT = async () => {
  await $.ajax({
    url: "/isUserAuth",
    type: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((res: any) => {})
    .catch((res: any) => {});
};
export { register, login };
