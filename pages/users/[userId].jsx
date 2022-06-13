import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Container } from "@mui/system";
import axios from "axios";
import { map, upperFirst } from "lodash";
import Head from "next/head";
import React, { Children, Fragment } from "react";
import ArticleCard from "../../src/components/ArticleCard";

export default function Index({ info, articles, comments }) {
  console.log(info, articles, comments);

  var name = upperFirst(`${info?.title} ${info?.firstName} ${info?.lastName}`);

  return (
    <Fragment>
      <Head>
        <title>{name}</title>
      </Head>

      <Container sx={{ pb: 3 }}>
        <h1>{name}</h1>

        <Grid container spacing={3}>
          {Children.toArray(
            map(articles?.data, (item) => {
              return (
                <Grid item md={4} sm={6} xs={12}>
                  <ArticleCard data={item} />
                </Grid>
              );
            })
          )}
        </Grid>

        <List>
          {Children.toArray(
            map(
              comments?.data,
              ({
                owner: { title, lastName, firstName, picture } = {},
                message,
              }) => {
                return (
                  <Fragment>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar src={picture} alt="picture" />
                      </ListItemIcon>
                      <ListItemText
                        primary={message}
                        secondary={`${title} ${firstName} ${lastName}`}
                      />
                    </ListItem>
                    <Divider/>
                  </Fragment>
                );
              }
            )
          )}
        </List>
      </Container>
    </Fragment>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params: { userId } }) {
  try {
    const { data: info } = await axios(`/user/${userId}`);
    const { data: articles } = await axios(`/user/${userId}/post`);
    const { data: comments } = await axios(`/user/${userId}/comment`);

    return {
      props: {
        info,
        articles,
        comments,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
