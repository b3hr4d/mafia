import GameMode, { IPlayerRoles, IFinalRoles } from "./components/GameDetails";

export type ModeState = keyof typeof GameMode;

export interface GameState {
  mode: ModeState;
  players: number;
  playerRoles: Person[];
  roles: IPlayerRoles;
  finalRoles: IFinalRoles;
}

interface Person {
  name: string;
  role: string;
}

export const initialState: GameState = {
  mode: "classicPro",
  players: 21,
  playerRoles: [],
  roles: {
    shahrvands: [],
    mafias: [],
    mostaghel: [],
  },
  finalRoles: [],
};

export type HeaderAction =
  | { type: "NewGame" }
  | { type: "mode"; payload: ModeState }
  | { type: "roles"; payload: IPlayerRoles }
  | { type: "FinalRoles"; payload: IFinalRoles }
  | { type: "playerRoles"; payload: Person }
  | { type: "DeleteRoles"; payload: IPlayerRoles }
  | { type: "DeletePlayerRoles" }
  | {
      type: "players";
      payload: number;
    };

export function HeaderReducer(state: GameState, action: HeaderAction) {
  switch (action.type) {
    case "mode":
      return {
        ...state,
        mode: action.payload,
      };
    case "players":
      return {
        ...state,
        players: action.payload,
        finalRoles: [],
        roles: { shahrvands: [], mafias: [], mostaghel: [] },
      };
    case "playerRoles":
      return {
        ...state,
        playerRoles: [...state.playerRoles, action.payload],
      };
    case "DeletePlayerRoles":
      return {
        ...state,
        playerRoles: [],
      };
    case "DeleteRoles":
      return {
        ...state,
        roles: { shahrvands: [], mafias: [], mostaghel: [] },
      };
    case "roles":
      return {
        ...state,
        roles: action.payload,
      };
    case "FinalRoles":
      return {
        ...state,
        finalRoles: action.payload,
      };
    case "NewGame":
      return {
        ...state,
        finalRoles: [],
        roles: { shahrvands: [], mafias: [], mostaghel: [] },
      };
    default:
      return state;
  }
}
