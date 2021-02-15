import React, { Dispatch } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GameCard from "./GameCard";
import { GameState, HeaderAction } from "../AppReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
    },
    paper: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

interface GameGroundProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

export const GameGround: React.FC<GameGroundProps> = ({ state, dispatch }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item md={6} xs={12} className={classes.paper}>
        <GameCard title="بازی جدید" link="/mafia/roles" dispatch={dispatch} />
      </Grid>
      {state.playerRoles.length ? (
        <Grid item md={6} xs={12} className={classes.paper}>
          <GameCard title="دیدن نقشها" link="/mafia/play" dispatch={dispatch} />
        </Grid>
      ) : null}
    </Grid>
  );
};
