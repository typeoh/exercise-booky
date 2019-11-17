import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Text from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Text displays email details with a default value', () => {

	//given
	const wrapper = shallow(
		<Text 
			value='donald@trump.com' 
			placeholder='Enter your email' />
	);

	//when
	let input = wrapper.find('input[type="text"]');

	//then
	expect(input.props().value).to.equal('donald@trump.com');
	expect(input.props().placeholder).to.equal('Enter your email');
});