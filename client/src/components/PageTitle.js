import React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import { desktop_viewport, tablet_viewport, mobile_viewport } from "../config";
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
    title: {
        fontFamily: theme.typography.fontFamily['Roboto']
    },
    textFieldsContainer: {
        [`@media (min-width: ${mobile_viewport}px)`]: {
          width: "80%",
        },
        [`@media (min-width: ${tablet_viewport}px)`]: {
          width: "50%",
        },
        [`@media (min-width: ${desktop_viewport}px)`]: {
          width: "40%",
        },
      },
}))

const PageTitle = ({ title }) => {
  const classes = styles();
  return (
    <Box
    display="flex"
    flexDirection="column"
    className={classes.textFieldsContainer}
  >
  <Typography variant="h1" className={clsx(classes.title, "page-title")}> {title} </Typography>
  </Box>
  );
};

export default (PageTitle);
