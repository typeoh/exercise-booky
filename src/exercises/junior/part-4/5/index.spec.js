import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StartingGrid from './index'

Enzyme.configure({ adapter: new Adapter() });

it('StartingGrid reverses a list of 3 teams', () => {

	//given
	const startingGrid = shallow(
		<StartingGrid teams={['Ferrari', 'McLaren', 'Williams']} />
	);
	
	//when
	let positions = startingGrid.find('.position');
	
	//then
	expect(positions).to.have.length(3);
	expect(positions.at(0).text()).to.equal('1. Williams');
	expect(positions.at(1).text()).to.equal('2. McLaren');
	expect(positions.at(2).text()).to.equal('3. Ferrari');
});