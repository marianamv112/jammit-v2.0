import React from "react";
import { TextField, withStyles, InputAdornment } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import clsx from 'clsx';

const styles = () => ({
  textField: {
    marginBottom: 20,
    width: "100%",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRadius: 10
  },
  iconSignifer: {
    color: "rgba(0, 0, 0, 0.54)",
    marginRight: 9,
    height: 24,
    width: 24,
  },
});


const UsernameField = ({ classes, value, onChange, error, onClick }) => {
  return (
    <TextField
      label="Username"
      variant="outlined"
      placeholder="johndoe"
      maxLength={20}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error && "This field is required"}
      onClick={onClick}
      required
      className={clsx(classes.textField, "username-input")}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PermIdentityIcon className={classes.iconSignifer} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default (withStyles(styles)(UsernameField));