import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Welcome from './index'

Enzyme.configure({ adapter: new Adapter() });

it(
	'Welcome displays a welcome message when the last ' +
	'name is provided', () => {

		//when
		const welcome = shallow(
			<Welcome firstName='Valentino' lastName='Rossi' />
		);

		//then
		expect(welcome.text()).to.equal('Welcome Mr Rossi');
	});