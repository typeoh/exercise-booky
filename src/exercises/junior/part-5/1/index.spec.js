import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Text from './index'

Enzyme.configure({ adapter: new Adapter() });

it(
	'Text displays a basic input text, ' + 
	'with a value and a placeholder', () => {

		//given
		const wrapper = shallow(<Text />);

		//when
		let input = wrapper.find('input[type="text"]');

		//then
		expect(input.props().value).to.equal('My first input!');
		expect(input.props().placeholder).to.equal(
			'This text is visible when input is blank'
		);
	});