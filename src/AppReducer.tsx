import GameMode, {
  IPlayerRoles,
  IFinalRoles,
  AllRols,
} from "./components/GameDetails";

export type ModeState = keyof typeof GameMode;

export interface GameState {
  mode: ModeState;
  players: number;
  playerRoles: Person[];
  roles: IPlayerRoles;
  finalRoles: IFinalRoles;
}

export interface Person {
  id: number;
  name: string;
  role: keyof typeof AllRols;
  alive: boolean;
}

export const initialState: GameState = {
  mode: "classicPro",
  players: 12,
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
  | { type: "isDead"; payload: { id: number } }
  | { type: "DeleteRoles"; payload: IPlayerRoles }
  | { type: "DeletePlayerRoles" }
  | { type: "players"; payload: number };

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
    case "isDead":
      return {
        ...state,
        playerRoles: state.playerRoles.map((props) =>
          props.id === action.payload.id
            ? { ...props, alive: !props.alive }
            : { ...props }
        ),
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
        playerRoles: [],
        roles: { shahrvands: [], mafias: [], mostaghel: [] },
      };
    default:
      return state;
  }
}
