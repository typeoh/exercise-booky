import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BasketballStar from './index'

Enzyme.configure({ adapter: new Adapter() });

it('BasketballStar displays Michael Jordan details', () => {

	//when
	const star = shallow(<BasketballStar />);
	
	//then
	expect(star.find('.firstName').text()).to.equal('Michael');
	expect(star.find('.lastName').text()).to.equal('Jordan');
});