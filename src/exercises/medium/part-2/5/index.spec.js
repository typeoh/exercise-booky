import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Calc from './index'

Enzyme.configure({ adapter: new Adapter() });

[{ 
	it: 'Displays total=16 when a=7, b=4, c=5',
	c: 5, total: 16, expected: 'The total is: 16' 
}, {
	it: 'Displays total=9 when a=7, b=4, c=-2',
	c: -2, total: 9, expected: 'The total is: 9' 
}].forEach(scenario => {

	it(scenario.it, () => {

		//when
		const wrapper = shallow(<Calc c={scenario.c} />);
		const state = wrapper.state();

		//then
		expect(state.a).to.equal(7);
		expect(state.b).to.equal(4);
		expect(state.total).to.equal(scenario.total);
		expect(wrapper.text()).to.equal(scenario.expected);
	});
});