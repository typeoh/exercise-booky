import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PressMe from './index'

Enzyme.configure({ adapter: new Adapter() });

it('PressMe checks whether the button has been pressed or not', () => {

	//when
	const wrapper = shallow(<PressMe />);
	const getPressMeButton = () => wrapper.find('button');
	const getMessage = () => wrapper.find('label');

	//then
	expect(getPressMeButton().text()).to.equal('Press me!');
	expect(getMessage().text()).to.equal('Button not pressed yet');

	//when
	getPressMeButton().simulate('click');

	//then
	expect(getMessage().text()).to.equal('Button already pressed!');
});