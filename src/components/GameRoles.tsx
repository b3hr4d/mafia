// @ts-nocheck
import React, { Dispatch } from "react";
import { PlayerRols, RolesNames } from "./GameDetails";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AccountBox, AccountBoxOutlined } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import { GameState, HeaderAction } from "../AppReducer";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    buttonPaper: {
      textAlign: "center",
      color: theme.palette.text.primary,
      padding: theme.spacing(1),
    },
    title: {
      padding: theme.spacing(2),
    },
    button: {
      paddingTop: theme.spacing(2),
    },
    checkedBoxIcon: {
      padding: theme.spacing(0.5),
      color: theme.palette.primary.main,
    },
    uncheckBoxIcon: {
      padding: theme.spacing(0.5),
      color: theme.palette.text.secondary,
    },
    checkBox: {
      cursor: "pointer",
      color: theme.palette.primary.main,
      userSelect: "none",
      display: "inline-flex",
      alignItems: "center",
      border: `1px solid ${theme.palette.primary.main}`,
      width: "125px",
      margin: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
    },
    unCheckBox: {
      cursor: "pointer",
      color: theme.palette.text.secondary,
      userSelect: "none",
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid",
      width: "125px",
      margin: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
    },
  })
);

interface GameRolesProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

export const GameRoles: React.FC<GameRolesProps> = ({ state, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  const totalBad = Math.floor(state.players / 3);

  const badRemain =
    totalBad - state.roles.mafias.length - state.roles.mostaghel.length;

  const goodRemain = state.players - totalBad - state.roles.shahrvands.length;

  const checkboxHandler = ({ pos, role }) => {
    const posItem = state.roles[pos];
    const index = posItem.findIndex((x) => x === role);
    if (index === -1) {
      if (pos === "shahrvands" && goodRemain <= 0) {
        return;
      } else if (pos === "mafias" && badRemain <= 0) {
        return;
      } else if (pos === "mostaghel" && badRemain <= 0) {
        return;
      }
      posItem.push(role);
    } else {
      posItem.splice(index, 1);
    }
    dispatch({
      type: "roles",
      payload: {
        ...state.roles,
        [pos]: [...posItem],
      },
    });
  };

  const submitHandler = () => {
    let filler = [
      ...state.roles.shahrvands,
      ...state.roles.mafias,
      ...state.roles.mostaghel,
    ];

    if (goodRemain > 0) {
      Array.from(Array(goodRemain), (_) => filler.push("shahrvandSade"));
    }
    if (badRemain > 0) {
      Array.from(Array(badRemain), (_) => filler.push("mafiaSade"));
    }
    dispatch({
      type: "FinalRoles",
      payload: filler,
    });
    history.push("/takerol");
  };
  const deleteHandler = () => {
    dispatch({
      type: "DeleteRoles",
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {Object.keys(RolesNames).map((roleName) => (
          <Grid item md={4} xs={12} key={roleName}>
            <Paper className={classes.paper}>
              <Typography className={classes.title}>
                نقش های {RolesNames[roleName]} ({" "}
                {roleName === "shahrvands" ? goodRemain : badRemain} )
              </Typography>
              {Object.keys(PlayerRols[roleName]).map((roles, i) => {
                const checked = state.roles[roleName].some((r) => r === roles);
                return (
                  <div
                    key={i}
                    className={checked ? classes.checkBox : classes.unCheckBox}
                    onClick={() =>
                      checkboxHandler({ pos: roleName, role: roles })
                    }
                  >
                    <IconButton
                      size="small"
                      className={
                        checked
                          ? classes.checkedBoxIcon
                          : classes.uncheckBoxIcon
                      }
                      id={PlayerRols[roleName][roles]}
                    >
                      {checked ? <AccountBox /> : <AccountBoxOutlined />}
                    </IconButton>
                    {PlayerRols[roleName][roles]}
                  </div>
                );
              })}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1} className={classes.paper}>
        <Grid item md={4} xs={6}>
          <Paper className={classes.buttonPaper}>
            شهروند ساده: {goodRemain}
          </Paper>
        </Grid>
        <Grid item md={4} xs={6}>
          <Paper className={classes.buttonPaper}>مافیا ساده: {badRemain}</Paper>
        </Grid>
        <Grid item md={1} xs={4}>
          <Button
            onClick={deleteHandler}
            variant="contained"
            color="secondary"
            fullWidth
          >
            X
          </Button>
        </Grid>
        <Grid item md={3} xs={8}>
          <Button
            onClick={submitHandler}
            variant="contained"
            color="primary"
            fullWidth
          >
            ادامه
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
