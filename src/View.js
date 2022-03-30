export default function View({
	difficulty,
	guess,
	attempts,

	lower,
	upper,
	attemptsLeft,

	onInit,
	onGuessBtn,
	onHelpBtn,
	onInput
}) {
	if (difficulty) {
		return (
			<>
				<p>Difficulty: {difficulty}</p>
				<p>Guess a number between {lower} and {upper}</p>
				<p>You have {attemptsLeft} tries left</p>
				<input
					type="number"
					placeholder="Enter your guess here..."
					onChange={onInput}
					value={guess}
				/>
				<button onClick={onGuessBtn}>Guess</button>
				<button onClick={onHelpBtn}>Help</button>
				<ol>
					{
						attempts.map(num => <li>{num}</li>)
					}
				</ol>
			</>
		);
	} else {
		return (
			<>
				<h1>Guess The Number!</h1>
				<h2>Please select a difficulty</h2>
				<select onChange={onInit}>
					<option>Please select an option...</option>
					<option value="easy">Walk in the park</option>
					<option value="medium">I'm no novice!!</option>
					<option value="hard">I like pain</option>
				</select>
			</>
		);
	}
}
