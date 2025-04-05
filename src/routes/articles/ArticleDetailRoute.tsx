import { useNavigate, useSearchParams } from "react-router";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button, Paper } from "@mantine/core";
import { useEffect } from "react";

export function ArticleDetailRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
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
            uri: url,
            fileType: "docx",
          },
        ]}
      />
    </Paper>
  );
}
