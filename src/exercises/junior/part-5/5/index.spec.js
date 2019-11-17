import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FruitPicker from './index'

Enzyme.configure({ adapter: new Adapter() });

it('FruitPicker allows user to select Apple and Orange', () => {

	//given
	const wrapper = shallow(<FruitPicker />);

	//when
	let select = wrapper.find('select');

	//then
	expect(select.find('option').at(0).text()).to.equal('Apple');
	expect(select.find('option').at(1).text()).to.equal('Orange');
});