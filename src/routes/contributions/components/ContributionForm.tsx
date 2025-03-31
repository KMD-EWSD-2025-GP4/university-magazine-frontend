import { contributionSchema, ContributionType } from "@/configs/schemas";
import { formatDate } from "@/utils/dates";
import {
  ActionIcon,
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
import { showNotification } from "@mantine/notifications";
import { uploadFile } from "@/services/common";
import { XIcon } from "@/icons";
import usePrompt from "@/hooks/usePrompt";
import { TermsAndConditionsDialog } from "./TermsAndConditionsDialog";
import { useGetTerms } from "../queries";
import { useUserStore } from "@/store/useUser";
import { useState } from "react";

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
  const [terms, setTerms] = useState("");
  const [openedTerms, setOpenedTerms] = useState(false);
  const { acceptedTerms, setAcceptedTerms } = useUserStore((state) => state);
  const { mutate, isPending } = useGetTerms();
  const navigate = useNavigate();
  const {
    onSubmit,
    getInputProps,
    setFieldValue,
    isDirty,
    resetDirty,
    values,
  } = useForm({
    initialValues,
    validate: zodResolver(contributionSchema),
  });
  usePrompt(isDirty());

  const handleDropDoc = async (files: File[]) => {
    const file = files[0];
    const res = await uploadFile(file);
    setFieldValue("article", res);
  };

  const handleReject = () => {
    showNotification({
      color: "red",
      title: "Invalid File",
      message: "Please upload a valid file",
    });
  };

  const handleImageChanges = async (files: File[]) => {
    const uploadedFiles = await Promise.all(
      files.map((file) => uploadFile(file))
    );

    setFieldValue("images", uploadedFiles);
  };

  const handleDecline = () => {
    setOpenedTerms(false);
    showNotification({
      color: "red",
      title: "Terms & Conditions Declined",
      message: "Please accept terms & conditions before submitting",
    });
  };

  const handleAgree = () => {
    setAcceptedTerms(true);
    setOpenedTerms(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmit((data) => {
        if (!acceptedTerms) {
          mutate(undefined, {
            onSuccess: (res) => {
              const termsContent = res.data?.[0]?.content || "";
              setTerms(termsContent);
              setOpenedTerms(true);
            },
          });
          return;
        }
        resetDirty();
        handleSubmit(data);
      })}
      p="xl"
      maw={720}
      mx="auto"
    >
      <Text size="26px" component="h1" fw={700}>
        {create ? "New" : "Update"} Contribution
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
          id="image"
          leftSectionWidth={100}
          multiple
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
          {...getInputProps("images")}
          onChange={handleImageChanges}
          valueComponent={(file) => {
            const images = file.value as unknown as {
              path: string;
            }[];
            return (
              <Stack>
                {images.map((f) => (
                  <Group gap="xs" key={f.path}>
                    <Text size="xs">{f.path?.split("/")?.pop()}</Text>
                    <ActionIcon
                      style={{
                        pointerEvents: "auto",
                      }}
                      variant="subtle"
                      onClick={(e) => {
                        e.stopPropagation();
                        const filtered = getInputProps("images")?.value?.filter(
                          (i: { path: string }) => i.path !== f.path
                        );
                        setFieldValue("images", filtered);
                      }}
                    >
                      <XIcon />
                    </ActionIcon>
                  </Group>
                ))}
              </Stack>
            );
          }}
        />

        <Dropzone
          mt="sm"
          multiple={false}
          onDrop={handleDropDoc}
          onReject={handleReject}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.doc, MIME_TYPES.docx]}
          h={130}
          bg="#F7FAFE"
          onClick={values.article.path ? () => {} : undefined}
        >
          <Group
            justify="center"
            gap="xl"
            mih={98}
            style={{ pointerEvents: "none" }}
          >
            <div>
              {values.article.path ? (
                <Group gap="xs">
                  <Text size="lg" inline>
                    {values.article.path?.split("/")?.pop()}
                  </Text>
                  <ActionIcon
                    style={{
                      pointerEvents: "auto",
                    }}
                    variant="subtle"
                    onClick={() => {
                      setFieldValue("article", { path: "" });
                    }}
                  >
                    <XIcon />
                  </ActionIcon>
                </Group>
              ) : (
                <>
                  <Text size="xl" inline>
                    Drag file or Browse
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Format: Only .doc or .docx format
                  </Text>
                </>
              )}
            </div>
          </Group>
        </Dropzone>
      </Stack>

      <Group align="center" mt={48} justify="end">
        <Button w={270} onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          color="primary.4"
          w={270}
          loading={loading || isPending}
          type="submit"
        >
          {create ? "Add" : "Update"}
        </Button>
      </Group>

      {/* <button
        type="button"
        onClick={() => {
          setAcceptedTerms(false);
        }}
      >
        dd
      </button> */}

      <TermsAndConditionsDialog
        terms={terms}
        opened={openedTerms}
        onClose={() => {
          setOpenedTerms(false);
        }}
        onAgree={handleAgree}
        onDecline={handleDecline}
      />
    </Paper>
  );
}
