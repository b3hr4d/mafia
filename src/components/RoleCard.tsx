import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Images from "../assets/images";
import { Theme, createStyles } from "@material-ui/core/styles";
import { AllRols } from "./GameDetails";
import { HeaderAction, Person } from "../AppReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    removed: {
      background: "red",
      margin: theme.spacing(2),
    },
    media: {
      height: 140,
    },
    title: {
      textAlign: "center",
    },
  })
);

interface RoleCardProps extends Person {
  dispatch: Dispatch<HeaderAction>;
}

const RoleCard: React.FC<RoleCardProps> = ({
  id,
  role,
  name,
  alive,
  dispatch,
}) => {
  const classes = useStyles();

  return (
    <Card className={alive ? classes.root : classes.removed}>
      <CardActionArea
        onClick={() =>
          dispatch({
            type: "isDead",
            payload: { id },
          })
        }
      >
        <CardHeader className={classes.title} title={AllRols[role]} />
        <CardMedia
          className={classes.media}
          image={Images[role]}
          title={role}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoleCard;
