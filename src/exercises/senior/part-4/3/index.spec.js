import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Username from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Username checks whether the entered text is valid or not', () => {

	//given
	const existing = ['karl', 'charlotte'];
	const forbidden = ['hitler', 'stalin'];

	//when
	const wrapper = shallow(
		<Username existing={existing} forbidden={forbidden} />
	);
	const getUsernameInput = () => wrapper.find('input[type="text"]');
	const getMessage = () => wrapper.find('label.message');
	const getSubmitButton = () => wrapper.find('input[type="submit"]');

	//then
	expect(getMessage().text()).to.equal('Please enter your username');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when the username already exists, then submission is disabled
	getUsernameInput().simulate('change', { target: { value: 'karl' }});
	expect(getMessage().text()).to.equal('The username is already taken');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when the username is not allowed, then submission is disabled
	getUsernameInput().simulate('change', { target: { value: 'Stalin' }});
	expect(getMessage().text()).to.equal('The username is not allowed');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when the username is valid, then submission is enabled
	getUsernameInput().simulate('change', { target: { value: 'Oliver' }});
	expect(getMessage().text()).to.equal('The username is available!');
	expect(getSubmitButton().prop('disabled')).to.equal(false);
});