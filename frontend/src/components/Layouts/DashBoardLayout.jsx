/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { fetchLogInUser } from "@/redux/app/auth/fetchLoginUser";
import { routes } from "@/router/routes.data";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { fetchLoginUserContents } from "@/redux/app/content/fetchLoginUserContents";
import { fetchUsersContents } from "@/redux/app/admin/fetchUsersContents";

const DashBoardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (Cookie.get("token")) {
      dispatch(fetchLogInUser());
    } else {
      navigate(routes.login, { replace: true });
    }
  }, []);
  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        dispatch(fetchLoginUserContents());
      } else if (user.role === "admin") {
        dispatch(fetchUsersContents());
      }
    }
  }, [user]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size="50" />
      </div>
    );
  }
  return (
    isAuthenticated && (
      <>
        <main className="flex flex-col md:flex-row md:pe-4 md:py-5 h-screen ">
          <aside className="md:px-5 flex items-center md:h-full ">
            <Sidebar />
          </aside>
          <div className="w-full max-w-7xl mx-auto h-full overflow-y-auto scrollBarHidden">
            <Outlet />
          </div>
        </main>
      </>
    )
  );
};
export default DashBoardLayout;
