import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Player from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Player displays score details for Andrea', () => {

	//given
	const person = { name: 'Andrea', score: 65 };
	
	//when
	const player = shallow(<Player person={person} />);
	
	//then
	expect(player.find('.name').text()).to.equal('Name: Andrea');
	expect(player.find('.score').text()).to.equal('Score: 65');
});