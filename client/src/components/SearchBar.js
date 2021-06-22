import {
  makeStyles,
  TextField,
  withStyles,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

const styles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  input: {
    borderRadius: 10,
  },
  iconSignifer: {
    color: "rgba(0, 0, 0, 0.54)",
    height: 24,
    width: 24,
  },
}));

const SearchBar = ({ onChange, onClick }) => {
  const classes = styles();

  return (
    <TextField
      variant="outlined"
      placeholder="Lisbon"
      
      onChange={onChange}
      className={clsx(classes.textField, "search_place_input")}
      InputProps={{
        className: classes.input,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="search map location"
              onClick={onClick}
            >
              <SearchIcon className={classes.iconSignifer} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
