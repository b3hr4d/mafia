import React, { Dispatch } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HeaderAction, GameState } from "../AppReducer";
import GameMode from "./GameDetails";
import {
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(1.5),
      alignSelf: "center",
      marginBottom: theme.spacing(1),
    },
    paper: {
      alignSelf: "center",
      marginBottom: theme.spacing(1),
    },
    drawerHeader: {
      display: "flex",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  })
);

interface GameGroundProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}
const allowedLink = ["/", "/roles"];

export const GameGroundHeader: React.FC<GameGroundProps> = ({
  state,
  dispatch,
}) => {
  const classes = useStyles();
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "players",
      payload: Number(event.target.value),
    });
  };
  const allowed = allowedLink.some((item) => item === location.pathname);
  return (
    <>
      <div className={classes.drawerHeader} />
      <Grid container className={classes.drawerHeader} item xs={12} spacing={1}>
        <Grid item xs={12} md={allowed ? 6 : 12}>
          <Paper className={classes.title}>
            <Typography variant="h5">{GameMode[state.mode].name}</Typography>
          </Paper>
        </Grid>
        {allowed && (
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                  تعداد بازیکنان
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={state.players}
                  type="number"
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">نفر</InputAdornment>
                  }
                  labelWidth={95}
                />
              </FormControl>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};
