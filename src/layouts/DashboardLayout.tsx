import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function DashboardLayout() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state?.user?.token);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
