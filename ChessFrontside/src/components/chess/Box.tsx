import * as React from 'react'
import {style} from 'typestyle'
import {chessSize, spacexy} from './Chess'

declare function require(url: string): string

interface BoxProps {
  chessChange: [[number, number], [number, number], number]  
  color: string  
}

 
export default class Box extends React.Component<BoxProps, any> {

  render() {
    let color:string   
    if (this.props.color=='r') {
      color = this.props.chessChange[2] == 1?'r':'b'
    } else {
      color = this.props.chessChange[2] == 1?'b':'r'
    }
    const box = require(`../../assets/style/${color}_box.png`)
    const BoxStylePrev = style({
      position: 'absolute',
      backgroundImage: `url(${box})`,
      width: chessSize,
      height: chessSize,
      top: -3+this.props.chessChange[0][0]*spacexy,
      left: -3+this.props.chessChange[0][1]*spacexy,
    })
    const BoxStyleNext = style({
      position: 'absolute',
      backgroundImage: `url(${box})`,
      width: chessSize,
      height: chessSize,
      top: -3+this.props.chessChange[1][0]*spacexy,
      left: -3+this.props.chessChange[1][1]*spacexy,
    })
    return (
      <div>
        <div className={BoxStylePrev}></div>
        <div className={BoxStyleNext}></div>
      </div>
    )
  }
}
