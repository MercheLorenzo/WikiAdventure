import { Lang } from "src/i18n";

export enum LobbyType {
  Public = "Public",
  Private = "Private",
  Twitch = "Twitch"
}

export interface GameData {
  ws?: WebSocket;
  uuid: string;
  lang: Lang;
  lobbyType: LobbyType;
  startPage: string;
  lobbyState: LobbyState;
  stateCounter: NodeJS.Timeout;
  round: number;
  timeLeft: number;
  timeStamp: number;
  endPage: string;
  lobbyID: string;
  owner:number;//id the owner player
  self: number;//id the player
  players: Array<Player>;
  messages: Array<Message>;
  winnerId: number;
  volume:number;
  mute:boolean;
}

export interface Player {
  pseudo: string;
  id: number;
  score: number;
  winStreak: number;
  isConnected:boolean;
}

export interface Message {
  playerID: number;
  content: string;
  timeStamp: number;
}

export enum LobbyState {
  Waiting = "Waiting",
  Voting = "Voting",
  Playing = "Playing",
  RoundFinish = "RoundFinish",
  GameFinish = "GameFinish"
}

const state: GameData = {
  ws: undefined,
  uuid: "",
  lang: Lang.en,
  lobbyType: LobbyType.Public,
  lobbyID: "",
  lobbyState: LobbyState.Voting,
  owner: -2,
  stateCounter: undefined,
  round: 0,
  timeLeft: 0,
  timeStamp: 0,
  startPage: "",
  endPage: "",
  self: -1,
  players: [],
  messages: [],
  winnerId: -1,
  volume: 1,
  mute: false
};

export enum LobbyEventType {
  PlayerJoin = "PlayerJoin",
  PlayerLeft = "PlayerLeft",
  VoteResult = "VoteResult",
  GameState = "GameState",
  UpdateScore = "UpdateScore",
  WinRound = "WinRound",
  Message = "Message"
}

export interface LobbyEvent<T> {
  type:LobbyEventType,
  data:T
}
export interface PlayerJoin {
  pseudo:string,
  id:number,//The player id
  score:number,
  self:boolean
}
export interface SetOwner {
  id:number//The player id
}
export interface PlayerLeft {
  id:number//The player id
}
export interface VoteResult {
  start:string,
  end:string
}
export interface GameState {
  state:LobbyState,
  round:number,
  time:number
}
export interface UpdateScore {
  id:number,//The player id
  score:number
}
export interface WinRound {
  id:number//The player id
}
export interface WsMessage {
  id:number,//The player id
  mes:string
}

export default state;
