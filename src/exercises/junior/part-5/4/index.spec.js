import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Checkboxes from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Checkboxes only marks the terms input', () => {

	//given
	const wrapper = shallow(<Checkboxes terms={true} news={false} />);

	//when
	let termsInput = wrapper.find('input[type="checkbox"].terms');
	let newsInput = wrapper.find('input[type="checkbox"].news');

	// //then
	expect(termsInput.props().value).to.equal(true);
	expect(newsInput.props().value).to.equal(false);
});