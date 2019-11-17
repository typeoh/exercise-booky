import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Walkman from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Walkman proves how cool were the 90s', () => {

	//given
	const wrapper = mount(<Walkman />);

	//when
	const getSideA = () => wrapper.find(SideA);
	const getSideB = () => wrapper.find(SideB);
	const getToggleSideButton = () => wrapper.find('button');

	//then
	expect(getSideA().exists()).to.equal(true);
	expect(getSideA().text()).to.equal('Spice Girls');
	expect(getSideB().exists()).to.equal(false);

	//when
	getToggleSideButton().simulate('click');

	//then
	expect(getSideA().exists()).to.equal(false);
	expect(getSideB().exists()).to.equal(true);
	expect(getSideB().text()).to.equal('Back Street Boys');
});