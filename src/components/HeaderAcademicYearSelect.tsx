import { useLocation, useSearchParams } from "react-router";
import { AcademicYearSelect } from "./select";
import { Flex, Text } from "@mantine/core";
import { routes } from "@/configs/menus";

const showInRoutes = [routes["mm-contributions"], routes["mc-contributions"]];

export function HeaderAcademicYearSelect() {
  const pathname = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const gAcademicYear = searchParams.get("gAcademicYear") || "";

  if (!showInRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Flex ml="auto" align="center" gap="md">
      <Text fw={600}>Academic Year</Text>

      <AcademicYearSelect
        value={gAcademicYear}
        onChange={(value) =>
          setSearchParams({
            gAcademicYear: value || "",
          })
        }
      />
    </Flex>
  );
}
