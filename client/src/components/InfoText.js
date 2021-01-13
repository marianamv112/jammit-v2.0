import React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import clsx from 'clsx'

const styles = makeStyles((theme) => ({
  textBox: {
      backgroundColor: theme.palette.primary.info,
      width: "100%",
      textAlign: "center",
      paddingTop: "0.4em", 
      paddingBottom: "0.4em",
      fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  textColor: {
    color: theme.palette.error.dark
  }
}));

const InfoText = ({ content, error }) => {
  const classes = styles();

  return (
    <Box className={clsx(classes.textBox, error ? [classes.textColor, 'error'] : 'info-text')}>
      <Typography>{content}</Typography>
    </Box>
  );
};

export default InfoText;
