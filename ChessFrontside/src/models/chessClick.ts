import * as Redux from 'redux'
import {createAction, Action} from 'redux-actions'
import {message} from 'antd'
import {PREFIX, gameState} from './index'
import {ChessProps, spacexy, chessSize} from '../components/chess/Chess'
import {nextPace} from './chessInfo'

 
function checkNextPace(i:number, j:number, newState:gameState) {
  let pace = newState.nextPace
  pace = pace.filter(item=>{
    if (item[0]==j && item[1]==i) {
      return true
    } else {
      return false
    }
  })
  if (pace.length == 1) {
    return true
  } else {
    return false
  }
}

 
export function chessClickAction(chess: ChessProps) { 
  return createAction<ChessProps>(`${PREFIX}/chessClick`)(chess)
}

export function chessClick(state:gameState, action:Action<ChessProps>) {
  const newState = {...state}
  if (state.mode==2 || state.mode==1&&state.side==-1) { 
    return newState
  }
 
  if (newState.clearChessMode) {
    newState.clearChessMode = false
    newState.click = null
    newState.nextPace = null
    newState.chessChange = null
    const i = action.payload.position[0]   
    const j = action.payload.position[1]
    if (!newState.board[i][j]) {
      return newState
    }
    if (newState.board[i][j]=='J0'||newState.board[i][j]=='j0') {
      message.error('将和帅是不可以让的哦～')
    } else {
      delete newState.board[i][j]
    }
    return newState
  }
  if (state.click) {   
    console.log('up status is',state)
    const i = action.payload.position[0]   
    const j = action.payload.position[1]
    const oldi = state.click.position[0]   
    const oldj = state.click.position[1]
    if (checkNextPace(i, j, newState)) {
      delete newState.board[oldi][oldj]   
      if (state.board[i][j]=='J0') {  
        newState.winner = 1
        newState.side = 0
      } else if (state.board[i][j]=='j0') {
        newState.winner = -1
        newState.side = 0
      }
      newState.board[i][j] = state.click.name
      newState.chessChange=[[i,j],[oldi,oldj],state.click.side]  
      newState.side = -newState.side   
      newState.history = [...state.history, newState.board.map(row=>[...row])]
      newState.paceHistory = [...newState.paceHistory, newState.chessChange.join()]
    }
    newState.nextPace = null
    newState.click = null
  } else {
    const chess = action.payload
    if (state.side!=chess.side) {   
      return newState
    }
    const i = chess.position[0]   
    const j = chess.position[1]
    newState.click = action.payload
    newState.nextPace = nextPace[chess.type](j, i, newState.board, chess.side)  
 
    const h = newState.paceHistory
    const l = h.length
    if (l>=8 && chess.name!='j0'&& chess.name!='J0' ) {
      newState.nextPace = newState.nextPace.filter((pace)=>{
        if (h[l-2]==h[l-6] && [[pace[1], pace[0]], [i, j], chess.side].join()==h[l-4]) {
          return false
        } else {
          return true
        }
      })
    }
  }
  return newState
}


 
export function boardClickAction(e: React.MouseEvent<HTMLDivElement>) {
  return createAction<React.MouseEvent<HTMLDivElement>>(`${PREFIX}/boardClick`)(e)
}

export function boardClick(state:gameState, action:Action<React.MouseEvent<HTMLDivElement>>) {
  console.log('down status is',state)
  nowContractStatus(state);
  const newState = {...state}
  if (state.mode==2 || state.mode==1&&state.side==-1) { 
    return newState
  }
 
  if (newState.clearChessMode) {
    newState.clearChessMode = false
    newState.click = null
    newState.nextPace = null
    newState.chessChange = null
    const e = action.payload
    const j = Math.round((e.clientX - e.currentTarget.offsetLeft - chessSize/2 + 5)/spacexy)   
    const i = Math.round((e.clientY - e.currentTarget.offsetTop - chessSize/2 + 5)/spacexy)
    if (!newState.board[i][j]) {
      return newState
    }
    if (newState.board[i][j]=='J0'||newState.board[i][j]=='j0') {
      message.error('Can not let your Jiang')
    } else {
      delete newState.board[i][j]
    }
    return newState
  }
  if (state.click) {   
    const e = action.payload
    const j = Math.round((e.clientX - e.currentTarget.offsetLeft - chessSize/2 + 5)/spacexy)   
    const i = Math.round((e.clientY - e.currentTarget.offsetTop - chessSize/2 + 5)/spacexy)
    const oldi = state.click.position[0]   
    const oldj = state.click.position[1]
    if (checkNextPace(i, j, newState)) {
      delete newState.board[oldi][oldj]   
      if (state.board[i][j]=='J0') {  
        newState.winner = 1
        newState.side = 0
      } else if (state.board[i][j]=='j0') {
        newState.winner = -1
        newState.side = 0
      }
      newState.board[i][j] = state.click.name
      newState.chessChange=[[i,j],[oldi,oldj],state.click.side]   
      newState.side = -newState.side   
      newState.history = [...state.history, newState.board.map(row=>[...row])]
      newState.paceHistory = [...newState.paceHistory, newState.chessChange.join()]
    }
    newState.nextPace = null
    newState.click = null
  } else {
    newState.click = null
  }
  return newState
}

 
export function AIClickAction(move: number[]|boolean) {
  return createAction<number[]|boolean>(`${PREFIX}/AIClick`)(move)
}

export function AIClick(state:gameState, action:Action<number[]|boolean>) {
  const newState = {...state}
  const move = action.payload
  if (move[0]===undefined) {  
    return newState
  }
  const oldx = move[0]  
  const oldy = move[1]
  const x = move[2]   
  const y = move[3]
  const key = newState.board[oldy][oldx]   
  if (state.board[y][x]=='j0') {  
    newState.winner = -1
    newState.side = 0
  } else if (state.board[y][x]=='J0') {  
    newState.winner = 1
    newState.side = 0
  }
  delete newState.board[oldy][oldx]   
  newState.board[y][x] = key
  newState.chessChange=[[y,x],[oldy,oldx],state.side]   
  newState.side = -newState.side   
  newState.history = [...state.history, newState.board.map(row=>[...row])]
  newState.paceHistory = [...newState.paceHistory, newState.chessChange.join()]
  if (state.mode == 4||state.mode == 12) { 
    newState.mode = state.mode / 4
  }
  return newState
}

function nowContractStatus(state){
  let gowith = Array(
    'C0', 'M0', 'X0', 'S0', 'J0', 'S1', 'X1', 'M1', 'C1','P0','P1','Z0', 'Z1', 'Z2', 'Z3', 'Z4',
    'z0', 'z1', 'z2', 'z3', 'z4', 'p0', 'p1', 'c0', 'm0','x0','s0','j0', 's1', 'x1', 'm1', 'c1',
  )
  let backArr = Array(
    '99','99','99','99','99','99','99','99','99','99','99','99','99','99','99','99',
    '99','99','99','99','99','99','99','99','99','99','99','99','99','99','99','99',
  )
  state.board.forEach((val,idx) =>{
    val.forEach((v,j)=>{
      let newpos = calPostion(idx,j);
      let i = gowith.indexOf(v);
      backArr[i] = newpos
    })
  })

  let bArr1 = '1'+ backArr.slice(0,8).join('');  
  let bArr2 = '2'+ backArr.slice(8,16).join('');    
  let rArr1 = '3'+ backArr.slice(16,24).join('');    
  let rArr2 = '4'+ backArr.slice(24,32).join('');    
  console.log("Black New status 1 is :", bArr1)
  console.log("Black New status 2 is :",bArr2)
  console.log("Red New status 1 is :",rArr1)
  console.log("Red New status 2 is :",rArr2)
  // add the Leo contract call here

}

function calPostion(i,j){
  let val = String(9 *i +j);
  if(val.length < 2){
    val = '0'+val;
  }
  return val;
}