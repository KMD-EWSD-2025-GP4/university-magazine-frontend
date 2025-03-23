import { usePage } from "@/store/usePage";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useLocation } from "react-router";

function callApi() {
  console.log("triggered");
}

const useVisitorCount = () => {
  const { pathname } = useLocation();
  const { pages, updatePage, addPage } = usePage((state) => state);

  useEffect(() => {
    const now = dayjs();
    const lastVisitedTime = pages[pathname];

    if (!lastVisitedTime) {
      callApi();
      addPage(pathname, now.toISOString());
      return;
    }

    if (now.diff(lastVisitedTime, "minute") < 60) {
      return;
    }

    callApi();
    updatePage(pathname, now.toISOString());
  }, [pathname, pages, addPage, updatePage]);

  return null;
};

export default useVisitorCount;
