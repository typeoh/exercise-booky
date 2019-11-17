import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MarkAsRead from './index'

Enzyme.configure({ adapter: new Adapter() });

it('EmailClient sets a button to mark an email as read', () => {

	//given
	const wrapper = mount(<EmailClient />);
	const markAsReadButton = wrapper.find(MarkAsReadButton);

	//then
	expect(wrapper.state().markedAsRead).to.equal(false);

	//when
	markAsReadButton.simulate('click');

	//then
	expect(wrapper.state().markedAsRead).to.equal(true);
});