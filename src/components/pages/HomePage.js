import React from "react";
import { createUseStyles } from "react-jss";
import HomePaper from "../HomePaper";
//import jammitLogo from "../../assets/images/Jammit_logo-nobg.png"

const useStyles = createUseStyles({
  background: {
    width: "100%",
    heigth: "100vh",
  },
});

function HomePage() {
    const classes = useStyles();
  return (
    <div className={classes.background}>
      <HomePaper/>
      {/* <img src={jammitLogo} /> */}
    </div>
  );
}

export default HomePage
