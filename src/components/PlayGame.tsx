import {
  createStyles,
  Grid,
  makeStyles,
  Switch,
  Theme,
  Paper,
  FormControlLabel,
  Button,
  Typography,
} from "@material-ui/core";
import React, { Dispatch, useState } from "react";
import { useHistory } from "react-router-dom";
import { GameState, HeaderAction } from "../AppReducer";
import { mafiaArray, shahrvandArray } from "./GameDetails";
import RoleCard from "./RoleCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      display: "flex",
      flexFlow: "wrap",
      padding: theme.spacing(2),
      justifyContent: "space-between",
      color: theme.palette.text.primary,
    },
  })
);

interface PlaygameProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

export const PlayGame: React.FC<PlaygameProps> = ({ state, dispatch }) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const newGameHandler = () => {
    dispatch({ type: "NewGame" });
    history.push("/mafia/");
  };
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item md={12} xs={12}>
        <Paper className={classes.paper}>
          <Grid item md={4} xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={show}
                  onChange={() => setShow((prev) => !prev)}
                  color="primary"
                />
              }
              label="نمایش نام"
            />
          </Grid>
          <Grid item md={4} xs={1} />
          <Grid item md={4} xs={5}>
            <Button
              onClick={newGameHandler}
              variant="contained"
              color="secondary"
            >
              اتمام بازی
            </Button>
          </Grid>
        </Paper>
      </Grid>
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={12} xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">مثبت</Typography>
            </Grid>
            {state.playerRoles.map(
              (player, i) =>
                shahrvandArray.includes(player.role) && (
                  <Grid key={i} item md={2} xs={12}>
                    <RoleCard
                      dispatch={dispatch}
                      {...player}
                      name={show ? player.name : "..."}
                    />
                  </Grid>
                )
            )}
          </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">منفی</Typography>
            </Grid>
            {state.playerRoles.map(
              (player, i) =>
                mafiaArray.includes(player.role) && (
                  <Grid key={i} item md={2} xs={12}>
                    <RoleCard
                      dispatch={dispatch}
                      {...player}
                      name={show ? player.name : "..."}
                    />
                  </Grid>
                )
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
