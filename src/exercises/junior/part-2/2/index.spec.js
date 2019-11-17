import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import President from './index'

Enzyme.configure({ adapter: new Adapter() });

it('President displays details for Bill Clinton', () => {

	//when
	const president = shallow(
		<President firstName='Bill' lastName='Clinton' />
	);
	
	//then
	expect(president.find('.firstName').text())
		.to.equal('First name: Bill');
	expect(president.find('.lastName').text())
		.to.equal('Last name: Clinton');
});