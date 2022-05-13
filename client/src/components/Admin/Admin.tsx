import React, { useContext } from "react";
import { AdminContext } from "../../Context/Admin";
import "../../styles/components/Admin/Admin.css";
import AdminPanel from "./AdminPanel";
import LoginAdmin from "./LoginAdmin";

const Admin = () => {
  const adminContext = useContext(AdminContext);

  return (
    <div className="admin">
      {adminContext.isLoggedIn ? <AdminPanel /> : <LoginAdmin />}
    </div>
  );
};

export default React.memo(Admin);
