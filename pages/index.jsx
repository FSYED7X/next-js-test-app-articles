import { Button, Stack } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Container } from "@mui/system";
import { useRouter } from "next/router";

export default function Index() {
  const { push } = useRouter();

  return (
    <Container>
      this is home page
      <Stack direction="row" spacing={3}>
        <Link href={"/articles"}>
          <Button color="primary" variant="contained">
            All Articles
          </Button>
        </Link>

        <Button
          onClick={() => {
            console.log("navigate to page");
            push("/articles/article-one");
          }}
          color="secondary"
          variant="contained"
        >
          Article one
        </Button>
      </Stack>
    </Container>
  );
}
