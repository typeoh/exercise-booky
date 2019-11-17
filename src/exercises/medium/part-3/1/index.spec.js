import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Input from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Input displays a controlled input field', () => {

	//when
	const wrapper = shallow(<Input />);
	const getInput = () => wrapper.find('input[type="text"]');

	//then
	expect(getInput().props().value).to.equal('Peter');
	
	//when
	getInput().simulate('change', { target: { value: 'Olivia' }});

	//then
	expect(getInput().props().value).to.equal('Olivia');
});