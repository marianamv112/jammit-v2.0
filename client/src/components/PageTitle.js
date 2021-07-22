import React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import clsx from "clsx";

const styles = makeStyles((theme) => ({
  title: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
}));

const PageTitle = ({ title }) => {
  const classes = styles();
  return (
    <Box className={classes.title}>
      <Typography variant="h1" className={clsx(classes.title, "page-title")}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
