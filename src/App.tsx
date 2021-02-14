import React, { useReducer } from "react";
import "./App.css";
import AppBarDrawer from "./components/AppBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { HeaderReducer, initialState } from "./AppReducer";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
  })
);

function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(HeaderReducer, initialState);
  console.log(state);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <AppBarDrawer state={state} dispatch={dispatch} />
        <main className={classes.content}>
          <AppRouter state={state} dispatch={dispatch} />
        </main>
      </Router>
    </div>
  );
}

export default App;
