import $ from "jquery";

const loginAdmin = async (
  username: string,
  password: string,
  accessCode: string
): Promise<{ success: boolean; message: string; cookie?: string }> => {
  var result = {
    success: false,
    message: "Something went wrong on the server. Please try again.",
  };
  await $.ajax({
      url: "/admin/api/login",
      type: "POST",
      data: {
          username,
          password,
          accessCode
      }
  })
  return result;
};

export { loginAdmin };
