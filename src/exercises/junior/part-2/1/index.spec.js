import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Welcome from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Welcome displays a welcome message to Peter', () => {

	//when
	const welcome = shallow(<Welcome user='Peter' />);

	//then
	expect(welcome.text()).to.equal('Welcome to React, Peter!');
});