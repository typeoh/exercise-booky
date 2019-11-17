import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResetPassword from './index'

Enzyme.configure({ adapter: new Adapter() });

it('ResetPassword disables the files while processing', async () => {

	//when
	const wrapper = shallow(<ResetPassword />);
	const getEmailInput = () => wrapper.find('input[type="email"]');
	const getSubmitButton = () => wrapper.find('button');

	//then
	expect(getSubmitButton().prop('disabled')).to.equal(false);
	expect(getEmailInput().prop('disabled')).to.equal(false);

	//when
	getSubmitButton().simulate('click');

	//then
	expect(getSubmitButton().prop('disabled')).to.equal(true);
	expect(getEmailInput().prop('disabled')).to.equal(true);

	//when
	await new Promise(resolve => setTimeout(resolve, 500));

	//then
	expect(getSubmitButton().prop('disabled')).to.equal(false);
	expect(getEmailInput().prop('disabled')).to.equal(false);
});