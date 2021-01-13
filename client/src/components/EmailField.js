import React from "react";
import { TextField, withStyles, InputAdornment } from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import clsx from 'clsx'

const styles = () => ({
  textField: {
    marginBottom: 20,
    width: "100%",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
  iconSignifer: {
    color: "rgba(0, 0, 0, 0.54)",
    marginRight: 9,
    height: 24,
    width: 24,
  }
});

const EmailField = ({ classes, value, onChange, errorValues, onClick }) => {
  return (
    <TextField
      label="Email"
      variant="outlined"
      placeholder="johndoe@mail.com"
      value={value}
      onChange={onChange}
      error={errorValues === "missingEmail"  ? true : errorValues === "wrongEmailFormat"}
      onClick={onClick}
      helperText={errorValues === "missingEmail"  ? "This field is required" : (errorValues === "wrongEmailFormat" && "The email format must be example@domain.com")}
      required
      className={clsx(classes.textField, "email-input")}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MailOutlineIcon className={classes.iconSignifer} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(styles)(EmailField);
