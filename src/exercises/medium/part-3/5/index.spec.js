import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FruitPicker from './index'

Enzyme.configure({ adapter: new Adapter() });

it('FruitPicker allows user to select Apple and Orange', () => {

	//when
	const wrapper = shallow(<FruitPicker selected='Apple' />);
	const getSelector = () => wrapper.find('select');

	//then
	expect(getSelector().find('option').at(0).text()).to.equal('Apple');
	expect(getSelector().find('option').at(1).text()).to.equal('Orange');
	expect(getSelector().props().value).to.equal('Apple');

	//when
	getSelector().simulate('change', { target: { value: 'Orange' }});

	//then
	expect(getSelector().props().value).to.equal('Orange');
});