import {
  Button,
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { Dispatch, useState } from "react";
import { useHistory } from "react-router-dom";
import { GameState, HeaderAction } from "../AppReducer";
import { AllRols } from "./GameDetails";

interface TakeRoleProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      margin: "auto",
    },
    chipRoot: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    inputs: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    names: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    button: {
      display: "flex",
      paddingLeft: theme.spacing(2),
    },
  })
);

export const TakeRole: React.FC<TakeRoleProps> = ({ state, dispatch }) => {
  const remaining = state.players - state.playerRoles.length;

  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const backHandler = () => {
    dispatch({
      type: "DeletePlayerRoles",
    });
    history.push("/roles");
  };

  const nextPersonHandler = () => {
    setName("");
    setRole("");
  };

  const takeRoleHandler = () => {
    const index = Math.floor(Math.random() * remaining);
    let randomRole = state.finalRoles[index];
    state.finalRoles.splice(index, 1);
    setRole(randomRole);
    dispatch({
      type: "playerRoles",
      payload: {
        name,
        role: randomRole,
      },
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid xs={12} item className={classes.inputs}>
        <Button
          variant="contained"
          color="primary"
          onClick={backHandler}
          fullWidth
        >
          بازگشت به انتخاب نقش
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.chipRoot}>
        <Chip label={`نفر: ${state.playerRoles.length}`} />
        <Chip label={`باقیمانده: ${remaining}`} />
      </Grid>
      <Grid xs={12} item className={classes.inputs}>
        <Grid item xs={6}>
          <TextField
            id="outlined-secondary"
            label="نام"
            variant="outlined"
            color="primary"
            value={name}
            onChange={inputHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={takeRoleHandler}
            disabled={name.length < 3 || !!!remaining || !!role}
            fullWidth
          >
            گرفتن نقش
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} item className={classes.inputs}>
        <Grid item xs={6} className={classes.names}>
          <Typography variant="h5" gutterBottom>
            اسم
          </Typography>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.names}>
          <Typography variant="h5" gutterBottom>
            نقش
          </Typography>
          <Typography variant="h6" gutterBottom>
            {/* @ts-ignore */}
            {AllRols[role]}
          </Typography>
        </Grid>
      </Grid>
      {!!remaining ? (
        <Grid xs={12} item className={classes.inputs}>
          <Button
            variant="contained"
            color="primary"
            onClick={nextPersonHandler}
            disabled={!!!role}
            fullWidth
          >
            نفر بعدی
          </Button>
        </Grid>
      ) : (
        <Grid xs={12} item className={classes.inputs}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => history.push("/play")}
          >
            دیدن نقشها
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
