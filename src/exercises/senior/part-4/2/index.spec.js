import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

it('ResetPassword allows user to set a new password', () => {

	//given
	const wrapper = shallow(<ResetPassword />);
	const getPasswordInput = () => wrapper.find('.password');
	const getConfirmPasswordInput = () => wrapper.find('.confirmPassword');
	const getSubmitButton = () => wrapper.find('input[type="submit"]');
	const setValue = (input, value) => {
		input.simulate('change', { target: { value }});
	};

	//when password <4 char, then submit is disabled
	setValue(getPasswordInput(), 'abc');
	expect(getSubmitButton().prop('disabled')).to.equal(true);
	
	//when password is valid but not confirmed, then submit is disabled
	setValue(getPasswordInput(), 'abcd');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when passwords dont match, then submit is disabled
	setValue(getConfirmPasswordInput(), 'abcde');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when passwords match, then submit is enabled
	setValue(getConfirmPasswordInput(), 'abcd');
	expect(getSubmitButton().prop('disabled')).to.equal(false);
});