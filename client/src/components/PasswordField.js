import React, { useState } from "react";
import {
  TextField,
  withStyles,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from 'clsx'

const styles = () => ({
  textField: {
    marginBottom: 20,
    width: "100%",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
});

const PasswordField = ({ classes, onChange, value, error, onClick }) => {
  const [passwordSettings, setPasswordSettings] = useState({
    showPassword: false,
    border: "1px solid #9e9e9e",
    padding: 8,
    borderRadius: 5,
  });

  const handleClickShowPassword = () => {
    setPasswordSettings({
      ...passwordSettings,
      showPassword: !passwordSettings.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      label="Password"
      variant="outlined"
      placeholder="*********"
      required
      className={clsx(classes.textField, "password-input")}
      type={passwordSettings.showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error && "This field is required"}
      onClick={onClick}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {passwordSettings.showPassword ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(styles)(PasswordField);
