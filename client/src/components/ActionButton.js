import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.onPrimary.main,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    alignSelf: "center",
    borderRadius: 10,
    height: 45,
  },
}));

const ActionButton = ({ text, onClick, disabled }) => {
  const classes = useStyles();
  return <Button 
  className={clsx(classes.button, 'action-button')} 
  disabled={disabled}
  onClick={onClick}> {text} </Button>;
};

export default ActionButton;
