import React from "react";

function BuyTickets(props) {
	return (
		<div>{
			props.user.age >= 18 ?
				'' :
				'' 
		}</div>
	);
}

export default BuyTickets