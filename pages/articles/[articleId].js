import { Button, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { map } from "lodash";
import Image from "next/image";
import { Container } from "@mui/system";

const ArticlePage = ({ data }) => {
  // console.log(data);
  // const {
  //   query: { articleId },
  // } = useRouter();

  // console.log(articleId);

  return (
    <Container>
      <h1>{data?.text}</h1>

      <CardMedia
        component="img"
        sx={{ aspectRatio: "16/9" }}
        image={data?.image}
        alt="Paella dish"
      />

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
    </Container>
  );
};

export default ArticlePage;

export async function getStaticPaths() {
  const { data: { data = [] } = {} } = await axios(`post`);

  // console.log(map(data, ({ id }) => ({ params: { articleId: id } })));

  return {
    paths: map(data, ({ id }) => ({ params: { articleId: id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { articleId } }) {
  const { data } = await axios(`post/${articleId}`);

  // console.log(data);

  return { props: { data } };
}
