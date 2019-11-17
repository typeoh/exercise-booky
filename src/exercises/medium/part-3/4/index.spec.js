import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Email from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Email displays 2 inputs and check if they match', () => {

	//when
	const wrapper = shallow(<Email />);
	const getEmail = () => wrapper.find('.email');
	const getConfirmEmail = () => wrapper.find('.confirmEmail');
	const getMatchMessage = () => wrapper.find('label');

	//then
	expect(getEmail().props().value).to.equal('');
	expect(getMatchMessage().text()).to.equal('Great! Emails match');
	
	//when
	getEmail().simulate('change', { target: { value: 'a@b.com' }});

	//then
	expect(getMatchMessage().text()).to.equal('Oh! Emails do not match!');

	//when
	getConfirmEmail()
		.simulate('change', { target: { value: 'a@b.com' }});

	//then
	expect(getMatchMessage().text()).to.equal('Great! Emails match');
});