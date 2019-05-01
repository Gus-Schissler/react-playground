import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import Square from './square';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles, withTheme } from '@material-ui/styles';

const gusTheme = createMuiTheme({
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

const styledTheme = makeStyles(theme => ({
	root: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': 'red',
	},
}));

function GameContainerRaw(props){
	return <div>{`${props.theme.root}`}</div>
}

GameContainerRaw.propTypes = {
  theme: PropTypes.object.isRequired,
};

const GameContainer = withTheme()(GameContainerRaw);

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
				'Go to game start';
			return (
				<li key={move}>
					<MuiThemeProvider theme={gusTheme}>
						<Button variant="outlined" color="primary" size="small" onClick={() => this.jumpTo(move)}>{desc}</Button>
					</MuiThemeProvider>
				</li>
			);
		});

		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<ThemeProvider theme={styledTheme}>
				<GameContainer>
					<Card raised={true} elevation={3}>
						<div className="game-board">
							<Board
								squares={current.squares}
								onClick={i => this.handleClick(i)}
							/>
						</div>
					</Card>
					<Divider>
					</Divider>
					<Card raised={true} elevation={3} className="game-info-container">
						<div className="game-info">
							<div>{status}</div>
							<ul>{moves}</ul>
						</div>
					</Card>
				</GameContainer>
			</ThemeProvider>
		);
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
