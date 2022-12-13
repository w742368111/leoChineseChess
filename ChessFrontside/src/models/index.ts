import * as Redux from 'redux'
import {ChessProps} from '../components/chess/Chess'
import {chessClick, boardClick, AIClick} from './chessClick'
import {startClick, changeSide, onModelOK, onModelCancel, toggleAI, onGameOver, clearChess, showHint, regretMove} from './buttonClick'

export const PREFIX = 'chess'

export interface gameState {
  side: number  
  click: ChessProps  
  board: string[][]   
  nextPace: Array<[number, number]>  
  chessChange: [[number, number], [number, number], number]   
  color: string 
  showModel: boolean  
  mode: number  
  difficulty: number  
  winner: number  
  clearChessMode: boolean  
  history: Array<string[][]>  
  paceHistory: string[]  
  dispatch: Redux.Dispatch<any>
}

const initState: gameState = {
  side: 0,
  click: null,
  board: [],
  nextPace: null,
  color: 'r',
  chessChange: null,
  showModel: false,
  mode: 1,
  difficulty: 2,
  winner: null,
  clearChessMode: false,
  history: [],
  paceHistory: [],
  dispatch: null
}

export default {
  namespace: PREFIX,
  state: initState,
  effects: {
  },
  reducers: {
    chessClick,
    boardClick,
    AIClick,
    startClick,
    changeSide,
    onModelOK,
    onModelCancel,
    toggleAI,  
    onGameOver,
    clearChess,  
    showHint,  
    regretMove,  
  }
}
