import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "next/link";

export default function ArticleCard({
  data: { image, owner, publishDate, text, id } = {},
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            src={owner?.picture}
            sx={{ border: `2px dashed ${blueGrey[200]}` }}
            aria-label="recipe"
          />
        }
        title={`${owner?.title} ${owner?.firstName} ${owner?.lastName}`}
        subheader={new Date(publishDate).toDateString()}
      />
      <Link href={`/articles/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
