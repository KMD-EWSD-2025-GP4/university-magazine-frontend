import { contributionSchema, ContributionType } from "@/configs/schemas";
import { formatDate } from "@/utils/dates";
import {
  Button,
  FileInput,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Stack } from "@mantine/core";

type ContributionProps = {
  create?: boolean;
  loading: boolean;
  initialValues: ContributionType;
  handleSubmit: (data: ContributionType) => void;
};

export function ContributionForm({
  create,
  loading,
  initialValues,
  handleSubmit,
}: ContributionProps) {
  const navigate = useNavigate();
  const { onSubmit, getInputProps } = useForm({
    initialValues,
    validate: zodResolver(contributionSchema),
  });

  return (
    <Paper
      component="form"
      onSubmit={onSubmit(handleSubmit)}
      p="xl"
      maw={720}
      mx="auto"
    >
      <Text size="26px" component="h1" fw={700}>
        New Contribution
      </Text>

      <Stack gap="lg">
        <SimpleGrid cols={2} mt={48} verticalSpacing={48} spacing={48}>
          <TextInput label="Article Title" {...getInputProps("title")} />
          <TextInput
            label="Submission Date"
            value={formatDate(new Date())}
            disabled
          />
        </SimpleGrid>

        <TextInput label="Description" {...getInputProps("description")} />

        <FileInput
          clearable
          id="image"
          leftSectionWidth={100}
          leftSection={
            <Paper
              bg="gray"
              py={4}
              px={8}
              radius="sm"
              component="label"
              htmlFor="image"
            >
              <Text c="white" size="sm">
                Choose File
              </Text>
            </Paper>
          }
          label="Image Upload (640 x 210)"
          accept="image/*"
        />

        <Dropzone
          mt="sm"
          onDrop={(files) => console.log("accepted files", files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.doc, MIME_TYPES.docx]}
          h={130}
          bg="#F7FAFE"
        >
          <Group
            justify="center"
            gap="xl"
            mih={98}
            style={{ pointerEvents: "none" }}
          >
            <div>
              <Text size="xl" inline>
                Drag file or Browse
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Format: Only .doc or .docx format
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Stack>

      <Group align="center" mt={48} justify="end">
        <Button w={270} onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button color="primary.4" w={270} loading={loading} type="submit">
          {create ? "Add" : "Update"}
        </Button>
      </Group>
    </Paper>
  );
}
