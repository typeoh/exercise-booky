import React from "react";

function ChallengeResults(props) {

	function getAverage() {
		return props.scores.reduce((average, score) => {
			return average + score / props.scores.length;
		}, 0);
	}

	return (
		<div>{
			true === true ? 'Well done!' : 'Keep training!'
		}</div>
	);
}

export default ChallengeResults