import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AverageScore from './index'

Enzyme.configure({ adapter: new Adapter() });

it('AverageScore display the rounded score of a player', () => {

	//when
	const wrapper = shallow(<AverageScore />);
	const state = wrapper.state();

	//then
	expect(state.firstScore).to.equal(78);
	expect(state.secondScore).to.equal(81);
	expect(wrapper.text()).to.equal('The average score is: 80');
});