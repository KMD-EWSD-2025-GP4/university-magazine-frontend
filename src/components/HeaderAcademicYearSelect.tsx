import { useLocation, useSearchParams } from "react-router";
import { AcademicYearSelect } from "./select";
import { Flex, Text } from "@mantine/core";
import { routes } from "@/configs/menus";

export function HeaderAcademicYearSelect() {
  const pathname = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const mmAcademicYear = searchParams.get("mmAcademicYear") || "";

  if (pathname !== routes["mm-contributions"]) {
    return null;
  }

  return (
    <Flex ml="auto" align="center" gap="md">
      <Text fw={600}>Academic Year</Text>

      <AcademicYearSelect
        value={mmAcademicYear}
        onChange={(value) =>
          setSearchParams({
            mmAcademicYear: value || "",
          })
        }
      />
    </Flex>
  );
}
