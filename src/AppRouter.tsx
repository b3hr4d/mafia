import React, { Dispatch } from "react";
import { GameGround } from "./components/GameGround";
import { Switch, Route } from "react-router-dom";
import { GameGroundHeader } from "./components/GameGroundHeader";
import { GameRoles } from "./components/GameRoles";
import { TakeRole } from "./components/TakeRole";
import { PlayGame } from "./components/PlayGame";
import { HeaderAction, GameState } from "./AppReducer";

interface AppRouterProps {
  state: GameState;
  dispatch: Dispatch<HeaderAction>;
}

export const AppRouter: React.FC<AppRouterProps> = ({ state, dispatch }) => {
  return (
    <>
      <GameGroundHeader state={state} dispatch={dispatch} />
      <Switch>
        <Route exact path="/">
          <GameGround state={state} dispatch={dispatch} />
        </Route>
        <Route path="/roles">
          <GameRoles state={state} dispatch={dispatch} />
        </Route>
        <Route path="/takerol">
          <TakeRole state={state} dispatch={dispatch} />
        </Route>
        <Route path="/play">
          <PlayGame state={state} dispatch={dispatch} />
        </Route>
      </Switch>
    </>
  );
};
