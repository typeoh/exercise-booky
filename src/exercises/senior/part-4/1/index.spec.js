import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

it('SignIn allows to submit when email and pwd are provided', () => {

	//given
	const wrapper = shallow(<SignIn />);
	const getEmailInput = () => wrapper.find('input[type="email"]');
	const getPasswordInput = () => wrapper.find('input[type="password"]');
	const getSubmitButton = () => wrapper.find('input[type="submit"]');
	const setValue = (input, value) => {
		input.simulate('change', { target: { value }});
	};

	//then the submit button is disabled by default
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when email is not valid, then the submit button is disabled
	setValue(getEmailInput(), 'david');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when email is valid but no password, then submit is disabled
	setValue(getEmailInput(), 'david@hasselhoff.com');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when email is valid but password <4 char, then submit is disabled
	setValue(getPasswordInput(), 'abc');
	expect(getSubmitButton().prop('disabled')).to.equal(true);
	
	//when password is valid but no email, then submit is disabled
	setValue(getEmailInput(), '');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when both email and password are valid, then submit is enabled
	setValue(getEmailInput(), 'david@hasselhoff.com');
	setValue(getPasswordInput(), 'abcd');
	expect(getSubmitButton().prop('disabled')).to.equal(false);
});