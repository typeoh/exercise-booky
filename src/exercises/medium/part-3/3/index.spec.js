import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Input from './index'

Enzyme.configure({ adapter: new Adapter() });

it('ResetableInput shows an input and a button to reset it', () => {

	//when
	const wrapper = shallow(<Input />);
	const getInput = () => wrapper.find('input[type="text"]');
	const getResetButton = () => wrapper.find('button');

	//then
	expect(getInput().props().value).to.equal('Charlotte');
	expect(getResetButton().text()).to.equal('Reset');

	//when
	getResetButton().simulate('click');

	//then
	expect(getInput().props().value).to.equal('');
});