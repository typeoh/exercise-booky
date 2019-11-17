import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Chess from './index'

Enzyme.configure({ adapter: new Adapter() });

[
	{ it: 'Chess sets classic players', white: 'Fisher', black: 'Karpov' },
	{ it: 'Chess sets modern players', white: 'Carlsen', black: 'Aronian' }
].forEach(scenario => {

	it(scenario.it, () => {

		//when
		const wrapper = shallow(
			<Chess white={scenario.white} black={scenario.black} />
		);
		const getTopPlayer = () => wrapper.find('label.top');
		const getBottomPlayer = () => wrapper.find('label.bottom');
		const getSwapButton = () => wrapper.find('button');

		//then
		expect(getTopPlayer().text()).to.equal(scenario.black);
		expect(getBottomPlayer().text()).to.equal(scenario.white);

		//when
		getSwapButton().simulate('click');

		//then
		expect(getTopPlayer().text()).to.equal(scenario.white);
		expect(getBottomPlayer().text()).to.equal(scenario.black);
	});
});