import * as Redux from 'redux'
import {createAction, Action} from 'redux-actions'
import {PREFIX, gameState} from './index'
import {gameOptions} from '../components/button/StartModel'

 
export function startClickAction() { 
  return createAction(`${PREFIX}/startClick`)()
}

export function startClick(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.showModel = true
  if (newState.winner) {
    newState.side = 0
  }
  newState.winner = null
  return newState
}

 
export function onModelOKAction(options:gameOptions) { 
  return createAction<gameOptions>(`${PREFIX}/onModelOK`)(options)
}

export function onModelOK(state:gameState, action:Action<gameOptions>) {
  const newState = {...state}
  const payload = action.payload
  newState.side = payload.color=='r'?payload.side:0-payload.side
  newState.difficulty = payload.difficulty
  newState.mode = payload.mode
  newState.color = payload.color
  newState.board = [  
    ['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    [    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
    ['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    ['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
    [    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    ['c0','m0','x0','s0','j0','s1','x1','m1','c1']
  ]
  newState.click = null
  newState.nextPace = null
  newState.chessChange = null
  newState.showModel = false
  newState.history = newState.side == 1?[[ 
    ['C0','M0','X0','S0','J0','S1','X1','M1','C1'],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    [    ,'P0',    ,    ,    ,    ,    ,'P1',    ],
    ['Z0',    ,'Z1',    ,'Z2',    ,'Z3',    ,'Z4'],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    ['z0',    ,'z1',    ,'z2',    ,'z3',    ,'z4'],
    [    ,'p0',    ,    ,    ,    ,    ,'p1',    ],
    [    ,    ,    ,    ,    ,    ,    ,    ,    ],
    ['c0','m0','x0','s0','j0','s1','x1','m1','c1']
  ]]:[]
  newState.paceHistory = []
  return newState
}

 
export function onModelCancelAction() { 
  return createAction(`${PREFIX}/onModelCancel`)()
}

export function onModelCancel(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.showModel = false
  return newState
}

 
export function toggleAIAction() { 
  return createAction(`${PREFIX}/toggleAI`)()
}

export function toggleAI(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.side = Math.abs(state.side)==2?state.side/2:state.side*2
  return newState
}

 
export function onGameOverAction() { 
  return createAction(`${PREFIX}/onGameOver`)()
}

export function onGameOver(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.winner = null
  newState.side = 0 
  return newState
}

 
export function changeSideAction() { 
  return createAction(`${PREFIX}/changeSide`)()
}

export function changeSide(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.board = newState.board.map((row)=>row).reverse()  
 
  newState.board = newState.board.map((row)=>{
    return row.map((key)=>{
      if (!key) {
        return key
      }
      let newKey:string[]=[]
      newKey[0] = key[0]>='a'?key[0].toUpperCase():key[0].toLowerCase()
      newKey[1] = key[1]
      return newKey.join('')
    })
  })
  newState.color = state.color=='r'?'b':'r'   
  newState.side = -state.side   
  newState.nextPace = null
  newState.click = null
  const c = state.chessChange   
  if (c) {
    newState.chessChange = [[9-c[0][0], c[0][1]], [9-c[1][0], c[1][1]], -c[2]]
  }
  if (state.mode == 1) {  
    newState.history = []
  } else if (state.mode == 3) {
    newState.history = [newState.board.map(row=>[...row])]
  }  
  return newState
}

 
export function clearChessAction() { 
  return createAction(`${PREFIX}/clearChess`)()
}

export function clearChess(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.clearChessMode = true
  return newState
}

 
export function showHintAction() { 
  return createAction(`${PREFIX}/showHint`)()
}

export function showHint(state:gameState, action:Action<null>) {
  const newState = {...state}
  newState.mode = state.mode*4  
  return newState
}

 
export function regretMoveAction() { 
  return createAction(`${PREFIX}/regretMove`)()
}

export function regretMove(state:gameState, action:Action<null>) {
  const newState = {...state}
  if (newState.history.length == 1) {
    return newState
  }
  if (state.mode == 1) {
    newState.history.pop()
    newState.history.pop()
    newState.board = newState.history[newState.history.length-1].map(row=>[...row])
  } else if (state.mode == 3) {
    newState.history.pop()
    newState.board = newState.history[newState.history.length-1].map(row=>[...row])
    newState.side = -state.side
  }
  newState.click = null
  newState.nextPace = null
  newState.chessChange = null
  return newState
}