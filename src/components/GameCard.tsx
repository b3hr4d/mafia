import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import MafiaImage from "../assets/images/mafia.jpg";
import { useHistory } from "react-router-dom";
import { HeaderAction } from "../AppReducer";

const useStyles = makeStyles({
  root: {
    minWidth: 180,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  title: {
    textAlign: "center",
  },
});

interface GameCardProps {
  title: string;
  link: string;
  dispatch: Dispatch<HeaderAction>;
}

const GameCard: React.FC<GameCardProps> = ({ title, link, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  const cardHandler = () => {
    if (link === "/roles") dispatch({ type: "NewGame" });
    history.push(link);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardHandler}>
        <CardMedia className={classes.media} image={MafiaImage} title={title} />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
