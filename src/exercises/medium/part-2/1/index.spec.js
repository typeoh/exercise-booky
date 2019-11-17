import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HelloState from './index'

Enzyme.configure({ adapter: new Adapter() });

it('HelloState displays a message from the state', () => {

	//when
	const wrapper = shallow(<HelloState />);

	//then
	expect(wrapper.state().message).to.equal('Hello state!');
	expect(wrapper.text()).to.equal('Hello state!');
});