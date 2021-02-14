import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { Dispatch, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameState, HeaderAction } from "../AppReducer";
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

export const PlayGame: React.FC<PlaygameProps> = ({ state }) => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (state.playerRoles.length < 6) {
      history.push("/");
    }
  }, [state.playerRoles, history]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {state.playerRoles.map((player, i) => (
          // @ts-ignorets
          <RoleCard key={i} role={player.role} name={player.name} />
        ))}
      </Paper>
    </div>
  );
};
