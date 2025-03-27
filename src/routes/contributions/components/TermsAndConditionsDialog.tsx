import { Box, Button, Group, Modal, ScrollArea, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { useEffect, useState } from "react";

type TermsAndConditionsDialogProps = {
  terms: string;
  opened: boolean;
  onClose: () => void;
  onAgree: () => void;
  onDecline: () => void;
};

export function TermsAndConditionsDialog({
  terms,
  onClose,
  opened,
  onAgree,
  onDecline,
}: TermsAndConditionsDialogProps) {
  const [viewed, setViewed] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) {
      setViewed(true);
    }
  }, [inViewport]);

  return (
    <Modal
      closeOnClickOutside={false}
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="lg">
          Terms and Conditions
        </Text>
      }
      centered
      size="xl"
    >
      <Text c="red" fw={600}>
        You must read and scroll down to accept it.
      </Text>

      <ScrollArea h={300} my="md">
        <Text>
          {terms}

          <Box ref={ref} pt={2} mt={-2}></Box>
        </Text>
      </ScrollArea>

      <Group align="center" justify="end" mt="xl">
        <Button w={120} variant="outline" onClick={onDecline}>
          Decline
        </Button>
        <Button w={120} color="primary" onClick={onAgree} disabled={!viewed}>
          Agree
        </Button>
      </Group>
    </Modal>
  );
}
