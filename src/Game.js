import React from 'react';
import ReactDOM from 'react-dom';
import './game.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      AILevel: "dumb",
      started: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
  this.setState({AILevel: event.target.value});
 }
  handleSubmit(event) {
    console.log("Game started")
    event.preventDefault();
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      started: true
    })
  }

  handleClick(i) {
  const squares = this.state.squares.slice();
  if (calculateWinner(squares) || squares[i] || !this.state.started) {
    return;
  }
  squares[i] ='X';
  this.setState({
    squares: squares,
  xIsNext: !this.state.xIsNext,},this.AI(squares));

}
AI(squares)
{
  switch(this.state.AILevel) {
    case "dumb":
    this.DumbAI(squares)
    break;
    case "smart":
    this.SmartAI(squares)
    break;
  }
}
DumbAI(squares) {
  console.log("DumbAI is playing!")
  let o=Math.floor(Math.random() * 8)
  if (calculateWinner(squares)) {
    return
  }
  else if (squares[o]){
    this.DumbAI(squares)
  }
  else {
  squares[o] ='O';
  this.setState({
    squares: squares,
  xIsNext: !this.state.xIsNext});
}
}
SmartAI(squares){
  if (calculateWinner(squares)) {
    return
  }
  console.log("SmartAI is playing!")
  let o;
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
    if ((squares[a]== 'X' && squares[b]=='X') || (squares[a]=='X' && squares[c]=='X')|| (squares[a]=='X' && squares[c]=='X')) {
    //if there are two 'X's on the same line, we play on the empty square of the same line to prevent player from winning
      if (squares[a]== null){ o = a;}
      if (squares[b]==null){ o = b;}
      if (squares[c]==null){ o=c;}
      squares[o] ='O';
      this.setState({
        squares: squares,
      xIsNext: !this.state.xIsNext});
    }
  }
  if (o== undefined)  // if there are no two 'X's on the same line, AI plays randomly
  {
    this.DumbAI(squares)
  }
}
renderSquare(i) {
return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
}
  render() {
  const winner = calculateWinner(this.state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

  }
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
         Choose the AI level:
         <div className="select">
         <select value={this.state.AILevel} onChange={this.handleChange}>
           <option value="dumb">Dumb</option>
           <option value="smart">Smart</option>
           <option value="unbeatable">Unbeatable</option>
         </select>
         <div className="select__arrow"></div>
         </div><br />
       <input className="start" type="submit" value="Start Game" />
     </form>
     <div>Level chosen: {this.state.AILevel}</div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  // console.log(squares)
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
      console.log("ya un winner")
      return squares[a];
    }
    else {
      let iterator =0;
      for (let x=0; x < squares.length; x++){
        if (squares[x] != null)
        {
          iterator++;
        }
      }
        if (iterator == squares.length)
        {
          console.log("match nul")
          return "draw";
        }
      }
  }
  return null;
}
export default Game;
