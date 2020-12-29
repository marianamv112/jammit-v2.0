import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.onPrimary.main,
    backgroundColor: theme.palette.primary.main,
    width: '50%',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
  },
}));

const ActionButton = ({ text, action }) => {
  const classes = useStyles();
  return <Button className={classes.button} onClick={action}> {text} </Button>;
};

export default ActionButton;
