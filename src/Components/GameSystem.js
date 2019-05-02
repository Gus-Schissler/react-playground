import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Typography, Grid, Paper, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0b3662',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0f5717',
      main: '#0f5717',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
  },
});

const squareStyles = {
  background: '#f2f4f5',
  border: '1px solid #0a0a0a',
  color: '#0b3662',
  fontFamily: 'sans-serif',
  float: 'left',
  fontSize: '32px',
  lineHeight: '34px',
  height: '64px',
  marginRight: '-1px',
  marginTop: '-1px',
  padding: '0',
  textAlign: 'center',
  width: '64px',
}

function Square(props) {
  return (
    <button style={squareStyles} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to start';
      return (
        <Grid item key={move}>
          <MuiThemeProvider theme={theme}>
            <Button variant="outlined" color="primary" size="small" onClick={() => this.jumpTo(move)}>{desc}</Button>
          </MuiThemeProvider>
        </Grid>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const styles = {
      Paper: {
        padding: 16,
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'center'
      }
    }

    return (
      <CssBaseline>
        <Grid container sm={12} spacing={16}>
          <Grid item sm>
            <Paper style={styles.Paper}>
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper style={styles.Paper}>
              <Grid container spacing={16}>
                  <Typography variant='h5'>Movement Panel</Typography>
                  <Grid item sm={6}><Typography variant='body1' align='center'>{status}</Typography></Grid>
                <Grid container spacing={8}>{moves}</Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </CssBaseline>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game
