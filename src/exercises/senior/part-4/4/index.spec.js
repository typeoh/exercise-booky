import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

it('AgeCheck blocks sign up if user is under 18 years old', () => {

	//when
	const wrapper = shallow(<AgeCheck />);
	const getAgeSelector = () => wrapper.find('select');
	const getMessage = () => wrapper.find('.message');
	const getQuestion = () => wrapper.find('input[type="text"]');
	const getSubmitButton = () => wrapper.find('input[type="submit"]');

	//then
	expect(getQuestion().exists()).to.equal(false);
	expect(getMessage().text()).to.equal('');

	//when age is <18, then user cannot sign up
	getAgeSelector().simulate('change', { target: { value: '<18' }});
	expect(getQuestion().exists()).to.equal(false);
	expect(getMessage().text()).to.equal('Sorry, you must be 18+ to proceed');
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when age is >=18, then we ask a second question to check if it's true
	getAgeSelector().simulate('change', { target: { value: '>=18' }});
	expect(getQuestion().exists()).to.equal(true);
	expect(getQuestion().props().placeholder)
		.to.equal('When did the German wall fall?');
	expect(getMessage().text()).to.equal('');	

	//when the answer is wrong, then the user cannot sign up
	getQuestion().simulate('change', { target: { value: '1988' }});
	expect(getMessage().text()).to.equal('Wrong answer!');	
	expect(getSubmitButton().prop('disabled')).to.equal(true);

	//when the answer is right, then the user can sign up
	getQuestion().simulate('change', { target: { value: '1989' }});
	expect(getMessage().text()).to.equal('Enjoy :)');	
	expect(getSubmitButton().prop('disabled')).to.equal(false);
});