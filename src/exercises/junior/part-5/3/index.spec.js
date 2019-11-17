import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Textarea from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Textarea displays a multi-line input (user thoughts)', () => {

	//given
	const wrapper = shallow(
		<Textarea 
			value='Over 300 languages are spoken in London' 
			placeholder='Please share your thoughts' />
	);

	//when
	let textarea = wrapper.find('textarea');

	//then
	expect(textarea.props().value)
		.to.equal('Over 300 languages are spoken in London');
	expect(textarea.props().placeholder)
		.to.equal('Please share your thoughts');
});