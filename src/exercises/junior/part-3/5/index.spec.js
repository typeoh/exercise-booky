import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ClubTickets from './index'

Enzyme.configure({ adapter: new Adapter() });

it(`
	ClubTickets allows the user to buy tickets 
	when he/she is at least 18 years old
`, () => {
	const niceClubTickets = shallow(
		<ClubTickets user={{ age: 18 }} />
	);
	expect(niceClubTickets.text()).to.equal('Purchased!');
});