import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FemalePlayers from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'FemalePlayers display a list of modern female players',
	list: [{ name: 'Federer', gender: 'M'}, { name: 'Osaka', gender: 'F'}],
	expected: ['Osaka']
}, {
	it: 'FemalePlayers display a list of classic female players',
	list: [{ name: 'Seles', gender: 'F'}, { name: 'Hingis', gender: 'F'}],
	expected: ['Hingis', 'Seles']
}].forEach(scenario => {

	it(scenario.it, () => {

		//when
		const wrapper = shallow(<FemalePlayers list={scenario.list} />);
		const players = wrapper.find('p');

		//then
		expect(players).to.have.length(scenario.expected.length);
		scenario.expected.forEach((player, i) => {
			expect(players.at(i).text()).to.equal(scenario.expected[i]);
		});
	});
});