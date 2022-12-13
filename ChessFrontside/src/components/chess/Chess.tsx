import * as React from 'react'
import * as Redux from 'redux'
import {style} from 'typestyle'

import {chessClickAction} from '../../models/chessClick'

declare function require(url: string): string

export interface ChessProps {
  name: string  
  type: string  
  side: 1|-1  
  position: [number, number]   
}

interface OtherProps {
  color: string   
  control: ChessProps  
  dispatch: Redux.Dispatch<any>
}

export const chessSize = 74 
export const spacexy = 80  


 
export default class Chess extends React.Component<ChessProps&OtherProps, any> {
 
  chooseBackGround(type: string, side: number, color:string) { 
    let bg: string = null
    if (side == 1) {
      bg = require(`../../assets/style/${color=='r'?'r':'b'}_${type}.png`)
    } else {
      bg = require(`../../assets/style/${color=='b'?'r':'b'}_${type}.png`)
    }
    return bg
  }

  render() {
    const ChessStyle = style({
      position: 'absolute',
      backgroundImage: `url(${this.chooseBackGround(this.props.type, this.props.side, this.props.color)})`,
      width: chessSize,
      height: chessSize,
      backgroundSize:'100% 100%',
      top: -3+this.props.position[0]*spacexy,
      left: -3+this.props.position[1]*spacexy,
      opacity: this.props.control && this.props.control.name == this.props.name?0.9:1,
    })
    return (
      <div className={ChessStyle} onClick={(e)=>{
        e.stopPropagation()
        this.props.dispatch(chessClickAction(this.props))}
      }>
      </div>
    )
  }
}

