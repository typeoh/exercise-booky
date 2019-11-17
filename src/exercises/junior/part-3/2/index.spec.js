import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuyTickets from './index'

Enzyme.configure({ adapter: new Adapter() });

it(`
	BuyTickets doesn't allow the user to proceed 
	the he/she is below 18
`, () => {

	//given
	let user = { name: 'Anthony', age: 16 };

	//when
	const buyTickets = shallow(<BuyTickets user={user} />);

	//then
	expect(buyTickets.text()).to.equal(
		'Sorry, try again once you turn 18'
	);
});