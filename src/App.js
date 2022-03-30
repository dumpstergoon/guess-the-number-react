import { Component } from 'react';
import { randomInteger } from './random.js';
import View from "./View.js";

class App extends Component {
	static DIFFICULTIES = {
		easy: {
			tries: 10,
			upper: 25,
		},
		medium: {
			tries: 7,
			upper: 50,
		},
		hard: {
			tries: 5,
			upper: 100,
		}
	}

	state = {
		difficulty: null,
		lower: null,
		upper: null,
		maxTries: null,
		target: null,
		attempts: [],
		guess: "",
	};

	get attemptsRemaining() {
		return this.state.maxTries - this.state.attempts.length;
	}

	render() {
		return (
			<View
				guess={this.state.guess}
				difficulty={this.state.difficulty}

				lower={this.state.lower}
				upper={this.state.upper}
				attempts={this.state.attempts}
				attemptsLeft={this.attemptsRemaining}

				onInit={({ target: { options, selectedIndex } }) => {
					this.init(options[selectedIndex].value);
				}}
				onGuessBtn={() => {
					this.guess(parseInt(this.state.guess));
				}}
				onHelpBtn={this.help.bind(this)}
				onInput={({ target: { value: guess } }) => {
					this.setState({ guess });
				}}
			/>
		);
	}

	init(difficulty = "easy") {
		const {
			lower = 1,
			upper = 100,
			tries: maxTries = 10,
		} = App.DIFFICULTIES[difficulty];

		this.setState({
			difficulty,
			lower,
			upper,
			maxTries,
			target: randomInteger(lower, upper)
		});
	}

	guess(num = 1) {
		this.setState({
			guess: "",
		});

		if (this.state.attempts.includes(num))
			return alert("You have guessed this already.");

		if (this.attemptsRemaining === 0) {
			alert("You have run out of tries. You lose :(");

			this.setState({
				difficulty: null,
			});
		}

		const {
			target,
			lower,
			upper,
			attempts
		} = this.state;

		if (num === target) {
			alert("You have won the game!");

			this.setState({
				difficulty: null,
			})
		}

		if (num < lower || num > upper) {
			alert("Choose a number BETWEEN the bounds.");
		} else {
			this.setState({
				attempts: [...attempts, num]
			});

			if (num < target) {
				alert("Too low, bro.");
			}

			if (num > target) {
				alert("Too high, guy.")
			}
		}
	}

	help() {
		const lastGuess = this.state.attempts.at(-1);

		if (isNaN(lastGuess))
			alert("You need to make a guess first.");

		let distance = Math.ceil(Math.abs(this.state.target - lastGuess) / 10) * 10;

		alert(`You are within ${distance} of the target.`);
	}
}

export default App;
