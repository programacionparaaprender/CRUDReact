import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './Vieja.css';
import CSS from 'csstype';

import { ApplicationState } from '../store';
import {IBoard,Vieja} from '../types'
import * as ViejaStore from '../store/Vieja';
import { connect } from 'react-redux';
type ViejaProps =
ViejaStore.ViejaState &
    typeof ViejaStore.actionCreators &
    RouteComponentProps<{}>;

function calculateWinner(squares:any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
   
function Square(props:any) {
    const style = {
      margin: '0.5em',
      paddingLeft: 0,
      listStyle: 'none',
      width:'100px',
      height:'100px'
    };
    return (
      <button style={style} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

 
export interface BoardPanel{
  squares: Array<string>
  onClick:Function
} 

class Board extends React.PureComponent<BoardPanel> {
    constructor(props: any) {
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    } 

    renderSquare(i:string) {
      const style = {
        margin: '0.5em',
        paddingLeft: 0,
        listStyle: 'none',
        width:'100px',
        height:'100px'
      };
      return (
        <Square
          value={this.props.squares[parseInt(i)]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    public render() {
      const vieja: CSS.Properties = {float: 'left',width: '300px',display:'block'};
      const row: CSS.Properties = {float: 'left',width: '100%'};
      const col: CSS.Properties = {float: 'left',width: '33.33%'};
      return (
        <div style={vieja}>
          <div style={row} className="board-row">
          <div style={col}>{this.renderSquare("0")}</div>
          <div style={col}>{this.renderSquare("1")}</div>
          <div style={col}>{this.renderSquare("2")}</div>
          </div>
          <div style={row} className="board-row">
            <div style={col}>{this.renderSquare("3")}</div>
            <div style={col}>{this.renderSquare("4")}</div>
            <div style={col}>{this.renderSquare("5")}</div>
            
            
            
          </div>
          <div style={row} className="board-row">
          <div style={col}>{this.renderSquare("6")}</div>
          <div style={col}>{this.renderSquare("7")}</div>
          <div style={col}>{this.renderSquare("8")}</div>
            
          </div>
        </div>
      );
    }
}


class ViejaVentana extends React.PureComponent<ViejaProps, Vieja> {
    constructor(props:any) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(s:string) {
      let i:number = parseInt(s);  
      
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }
  
  
    jumpTo(step:number) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }
    
  
    public render() {
        const history:Array<IBoard> = this.state.history;
        const current:IBoard = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const row: CSS.Properties = {float: 'left',width: '100%'};
        const col: CSS.Properties = {float: 'left',width: '33.33%'};
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                  <button
                    type="button"
                    className="btn btn-success" 
                    onClick={() => this.jumpTo(move)}>
                      {desc}
                  </button>
                </li>
            );
        });
    
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
          <div className="card card-default">
            <div className="card-body">
              <Board
                squares={current.squares}
                onClick={(i:string) => this.handleClick(i)}
              />
            </div>
            <div style={row} className="game-info">
              <div><h2>{status}</h2></div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
};

export default connect(
  (state: ApplicationState) => state.vieja,
  ViejaStore.actionCreators
)(ViejaVentana as any);
