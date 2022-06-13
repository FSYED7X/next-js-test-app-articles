import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { Container } from "@mui/system";
import { map } from "lodash";
import ArticleCard from "../../src/components/ArticleCard";
import Grid from "@mui/material/Grid";

export default function Articles({ data, pagination }) {
  return (
    <div>
      <Head>
        <title>Articles</title>
      </Head>

      <Container>
        <h1>List of articles</h1>

        <Grid container spacing={3}>
          {React.Children.toArray(
            map(data, (item) => {
              return (
                <Grid item md={4} sm={6} xs={12}>
                  <ArticleCard data={item} />
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>

      <Link href="/">
        <button>Home</button>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const { data: { data, ...pagination } = {} } = await axios("post");
  return {
    props: {
      data,
      pagination,
    },
  };
}
