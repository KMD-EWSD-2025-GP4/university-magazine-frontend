import { useNavigate, useSearchParams } from "react-router";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button, Paper } from "@mantine/core";
import { useEffect } from "react";

export function ArticleDetailRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "";

  console.log("url", url);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = () => {
    document.body.style.overflow = "auto";
    navigate(-1);
  };

  return (
    <Paper
      pos="relative"
      style={{
        zIndex: 10,
      }}
    >
      <Button
        pos="absolute"
        top={8}
        right={10}
        style={{
          zIndex: 10,
        }}
        variant="subtle"
        onClick={handleClose}
      >
        Close
      </Button>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        className="test"
        documents={[
          {
            uri: "https://ewsd-bucket.s3.ap-southeast-1.amazonaws.com/uploads/014d342d-a36e-4d8b-a647-c6ce2bc6cc47/6cec1e1e-2fbf-410d-8f0f-95b30f692d44.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQFLZDMRPCOHBBG52%2F20250323%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250323T122136Z&X-Amz-Expires=604800&X-Amz-Signature=48a0f168f80b7897bd5fbc21da0de121aaf73644112d135b00ca7cd4e9c40357&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
            fileType: "docx",
          },
        ]}
      />
    </Paper>
  );
}
