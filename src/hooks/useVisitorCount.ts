import { viewContribution } from "@/services/contribution";
import { usePage } from "@/store/usePage";
import dayjs from "dayjs";
import { useEffect } from "react";

const useVisitorCount = (contributionId?: string) => {
  const { pages, updatePage, addPage } = usePage((state) => state);

  /**
   * it will triggered twice in developer mode because of react strict mode
   */
  useEffect(() => {
    async function runAsync(id: string) {
      const now = dayjs();
      const lastVisitedTime = pages[id];

      if (!lastVisitedTime) {
        addPage(id, now.toISOString());
        viewContribution(id);
        return;
      }

      if (now.diff(lastVisitedTime, "minute") < 60) {
        return;
      }

      updatePage(id, now.toISOString());
      viewContribution(id);
    }

    if (!contributionId) {
      return;
    }
    runAsync(contributionId);
  }, [contributionId, pages, addPage, updatePage]);

  return null;
};

export default useVisitorCount;
