import * as React from 'react'
import * as Redux from 'redux'
import {style} from 'typestyle'
import {nextPace, chessValue} from '../../models/chessInfo'
import {AIClickAction} from '../../models/chessClick'

interface AIProps {
  treeDepth: number  
  board: string[][] 
  side: number 
  dispatch: Redux.Dispatch<any>
  mode: number 
  paceHistory: string[] 
}


export default class AI extends React.Component<AIProps, any> {

  number: number 

 
  evaluate(board:string[][], side:number) {
    let val=0
    board.forEach((row, i)=>{
      row.forEach((key, n)=>{
        if (key){
          val += chessValue[key[0]][i][n] * (key[0]>='a'?1:-1) 
        }
      })
    })
    val+=Math.round(Math.random() * 20 - 10)  
    this.number++
    return val*side 
  }


  getAllMyChess(board:string[][], side:number) {
    let chessArray: Array<{x:number,y:number,key:string}> = [] 
    board.forEach((row, i)=>{
      row.forEach((key, n)=>{
        if (key && (key[0]>='a'?1:-1) == side){
          let chess = {x:n, y:i, key:key}
          chessArray.push(chess)
        }
      })
    })
    return chessArray
  }


  getMoves(board:string[][], side:number) {
    let chessArray = this.getAllMyChess(board, side)
    let moves: [number, number, number, number, string][] = []
    chessArray.forEach((chess)=>{

      let nextMove:number[][] = nextPace[chess.key[0].toLowerCase()](chess.x, chess.y, board, side)

      const h = this.props.paceHistory
      const l = h.length
      if (l>=8 && chess.key!='j0'&& chess.key!='J0') {
        nextMove = nextMove.filter((pace)=>{
          if (h[l-2]==h[l-6] && [[pace[1], pace[0]], [chess.y, chess.x]].join()==h[l-4].substr(0,7)) {
            return false
          } else {
            return true
          }
        })
      }
      nextMove.forEach((move)=>{
        let x=chess.x
        let y=chess.y
        let newX=move[0]
        let newY=move[1]
        moves.push([x, y, newX, newY, chess.key])
      })
    })
    return moves;
  }


  getAlphaBeta(A:number, B:number, depth:number, board:string[][] ,side:number) { 
    if (depth == 0) {
      return {value: this.evaluate(board , side)}; 
  　}
    let moves = this.getMoves(board, side); 
    let result:{oldx:number, oldy:number, key:string, x:number, y:number, value:number} = null  
    for (let move of moves) {
       
      let key = move[4]
      let oldX= move[0]
      let oldY= move[1]
      let newX= move[2]
      let newY= move[3]
      let clearKey = board[ newY ][ newX ]||""  
      board[ newY ][ newX ] = key
      delete board[ oldY ][ oldX ]
      
      if (clearKey=="j0"||clearKey=="J0") { 
       
        board[ oldY ][ oldX ] = key
        delete board[ newY ][ newX ]
        board[ newY ][ newX ] = clearKey
         
        return {oldx:oldX, oldy:oldY, key:key, x:newX, y:newY, value:8888}
      } else { 
        let val = -this.getAlphaBeta(-B, -A, depth - 1, board, -side).value  
         　 
        board[ oldY ][ oldX ] = key
        delete board[ newY ][ newX ]
        if (clearKey){
          board[ newY ][ newX ] = clearKey
        }
         
        if (val >= B) { 
          return {oldx:oldX, oldy:oldY, key:key, x:newX, y:newY, value:B}
        } 
         
        if (val > A) { 
        	A = val 
          result={oldx:oldX, oldy:oldY, key:key, x:newX, y:newY, value:A}
        } 
      } 
    } 
     
    if (!result){
      return {value:A}
    }
    return result; 
  }

  render() {
    return null
  }

   
  arrayClone(board:string[][]) {
    return board.map((row)=>[...row])
  }

   
  init(depth:number) {
    if (depth == 0) {
      console.error('搜索深度不能为0！')
      return false
    }
    let initTime = new Date().getTime();
    this.number = 0
     
    let result = this.getAlphaBeta(-9999 ,9999, depth, this.arrayClone(this.props.board), this.props.side) as {oldx:number, oldy:number, key:string, x:number, y:number, value:number}
    let chess = result.key;
    var nowTime= new Date().getTime();
    const log ='AI搜索结果：最佳着法：'+
                    [result.oldx, result.oldy, result.x, result.y]+
                    ' 搜索深度：'+depth+'搜索分支：'+
                    this.number+'个 最佳着法评估：'+
                    result.value+'分'+
                    ' 搜索用时：'+
                    (nowTime-initTime)+'毫秒'
    // console.log(log)
    return [result.oldx, result.oldy, result.x, result.y]
  }

  componentDidUpdate() {
    switch (this.props.mode) {  
      case 1: if (this.props.side == -1) {  
                setTimeout(()=>{
                  let result = this.init(this.props.treeDepth)
                  this.props.dispatch(AIClickAction(result))
                }, 500)
              } 
              break
      case 2: if (this.props.side == -1) { 
                setTimeout(()=>{
                  let result = this.init(this.props.treeDepth)
                  this.props.dispatch(AIClickAction(result))
                }, 500)
              } else if (this.props.side == 1) {
                setTimeout(()=>{
                  let result = this.init(this.props.treeDepth)
                  this.props.dispatch(AIClickAction(result))
                }, 500)
              }
              break
      case 3: break  
      default: if (this.props.side == -1) {  
                setTimeout(()=>{
                  let result = this.init(this.props.treeDepth)
                  this.props.dispatch(AIClickAction(result))
                }, 500)
              } else if (this.props.side == 1) {
                setTimeout(()=>{
                  let result = this.init(this.props.treeDepth)
                  this.props.dispatch(AIClickAction(result))
                }, 500)
              }
              break
    }
  }
}
