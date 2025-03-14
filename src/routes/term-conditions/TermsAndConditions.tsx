import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Group,
  Stack,
  Textarea,
  Text,
  Title,
  Breadcrumbs,
  Anchor,
  Loader,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate, Link } from "react-router";
import { useGetTerms, useCreateTerms, useUpdateTerms } from "./queries";

export function TermsAndConditions() {
  const navigate = useNavigate();
  const { data: termsData, isLoading, isError } = useGetTerms();
  const createTermsMutation = useCreateTerms();
  const updateTermsMutation = useUpdateTerms();

  const [terms, setTerms] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Load existing terms if available
  useEffect(() => {
    if (Array.isArray(termsData) && termsData.length > 0) {
      setTerms(termsData[0].content);
      setIsEditing(true);
    }
  }, [termsData]);

  const handleSubmit = async () => {
    if (!terms.trim()) {
      showNotification({
        title: "Warning",
        message: "Please enter terms & conditions before submitting.",
        color: "yellow",
      });
      return;
    }

    try {
      if (
        isEditing &&
        termsData &&
        Array.isArray(termsData) &&
        termsData.length > 0
      ) {
        await updateTermsMutation.mutateAsync({
          id: termsData[0].id,
          content: terms,
          name: "",
        });

        showNotification({
          title: "Success",
          message: "Terms & Conditions updated successfully!",
          color: "green",
        });
      } else {
        await createTermsMutation.mutateAsync({
          name: "Terms & Conditions",
          content: terms,
        });

        showNotification({
          title: "Success",
          message: "Terms & Conditions added successfully!",
          color: "green",
        });
      }

      //navigate(-1);
    } catch (error) {
      console.error("Error saving terms:", error);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again.",
        color: "red",
      });
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <Text color="red">Error loading terms. Please try again.</Text>;

  return (
    <Container size="md" mt="lg">
      <Breadcrumbs mb="md">
        <Anchor component={Link} to="/d/system-param/faculty">
          System Parameters
        </Anchor>
        <Text>Terms & Conditions</Text>
      </Breadcrumbs>

      <Title order={2} mb="md">
        {isEditing ? "Edit Terms & Conditions" : "Register Terms & Conditions"}
      </Title>

      <Stack gap="lg">
        <Textarea
          label="Terms & Conditions"
          placeholder="Enter terms & conditions..."
          minRows={6}
          autosize
          value={terms}
          onChange={(event) => setTerms(event.target.value)}
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#0A284B", color: "white" }}
            onClick={handleSubmit}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
