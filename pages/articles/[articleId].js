import { Button, CardMedia, Stack } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { map, upperCase } from "lodash";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment } from "react";

const ArticlePage = ({ data }) => {
  // const { isFallback } = useRouter();

  // if (isFallback)
  //   return (
  //     <Stack height={"100vh"} alignItems="center" justifyContent="center">
  //       <CircularProgress />
  //     </Stack>
  //   );

  return (
    <Fragment>
      <Head>
        <title>{upperCase(data?.text)}</title>
      </Head>
      <Container>
        <h1>{data?.text}</h1>

        <CardMedia
          sx={{ aspectRatio: "24/9", height: "100%", width: "100%", mb: 2 }}
          image={data?.image}
          alt="Paella dish"
        />

        <Stack direction="row" spacing={3}>
          <Link href={"/articles"}>
            <Button color="secondary" variant="contained">
              Back to All articles
            </Button>
          </Link>

          <Link href={"/"}>
            <Button color="success" variant="contained">
              Home
            </Button>
          </Link>
        </Stack>
      </Container>
    </Fragment>
  );
};

export default ArticlePage;

export async function getStaticPaths() {
  const { data: { data = [] } = {} } = await axios(`post`);

  return {
    paths: map(data, ({ id }) => ({ params: { articleId: id } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { articleId } }) {
  try {
    const { data } = await axios(`post/${articleId}`);
    return { props: { data } };
  } catch (error) {
    return { notFound: true };
  }
}
