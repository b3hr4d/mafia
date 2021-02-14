import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import MafiaImage from "../assets/images/mafia.jpg";
import { Theme, createStyles } from "@material-ui/core/styles";
import { AllRols } from "./GameDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 150,
      maxWidth: 200,
      margin: theme.spacing(3),
    },
    removed: {
      minWidth: 150,
      maxWidth: 200,
      background: "red",
      margin: theme.spacing(3),
    },
    media: {
      height: 140,
    },
    title: {
      textAlign: "center",
    },
  })
);

interface RoleCardProps {
  role: keyof typeof AllRols;
  name: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, name }) => {
  const [removed, setRemoved] = useState(false);
  const classes = useStyles();

  return (
    <Card className={removed ? classes.removed : classes.root}>
      <CardActionArea onClick={() => setRemoved((prev) => !prev)}>
        <CardHeader title={AllRols[role]} />
        <CardMedia className={classes.media} image={MafiaImage} title={role} />
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
