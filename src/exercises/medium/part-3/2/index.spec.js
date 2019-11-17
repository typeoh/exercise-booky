import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Salary from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Salary exposes the salary expectations of a player', () => {

	//when
	const wrapper = shallow(<Salary />);
	const getInput = () => wrapper.find('input[type="number"]');
	const getMessage = () => wrapper.find('label');

	//then
	expect(getInput().props().value).to.equal('');
	expect(getMessage().text()).to.equal('');
	
	//when
	getInput().simulate('change', { target: { value: '28000' }});

	//then
	expect(getInput().props().value).to.equal('28000');
	expect(getMessage().text()).to.equal('Expected salary: £28000');
});