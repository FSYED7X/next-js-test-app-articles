import axios from "axios";
import { map } from "lodash";
import { Children, Fragment } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";
import Head from "next/head";
import Link from "next/link";

export default function Users({ data }) {
  //   console.log(data);
  return (
    <Fragment>
      <Head>
        <title>Users</title>
      </Head>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {Children.toArray(
            map(data, ({ picture, lastName, firstName, title, id }) => {
              return (
                <Grid item md={3} sm={4} xs={12}>
                  <Link href={`/users/${id}`} passHref>
                    <Paper>
                      <ListItem button>
                        <ListItemIcon>
                          <Avatar src={picture} alt="picture" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${title} ${firstName} ${lastName}`}
                        />
                      </ListItem>
                    </Paper>
                  </Link>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}

export async function getStaticProps() {
  try {
    const {
      data: { data = [], ...pagination },
    } = await axios("user");
    return {
      props: { data, pagination },
    };
  } catch (error) {
    return { notFound: true };
  }
}
