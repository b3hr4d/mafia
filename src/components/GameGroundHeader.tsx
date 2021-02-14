import React, { Dispatch } from "react";
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
  Divider,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingBottom: theme.spacing(2),
    },
    devider: {
      marginBottom: theme.spacing(2),
    },
    drawerHeader: {
      display: "flex",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

interface GameGroundProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

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
  return (
    <>
      <div className={classes.drawerHeader} />
      <Grid container className={classes.drawerHeader} item xs={12} spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className={classes.paper}>
            {GameMode[state.mode].name}
          </Typography>
        </Grid>
        {location.pathname === "/" ||
          (location.pathname === "/roles" && (
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                className={classes.paper}
                variant="outlined"
              >
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
            </Grid>
          ))}
      </Grid>
      <Divider variant="middle" className={classes.devider} />
    </>
  );
};
