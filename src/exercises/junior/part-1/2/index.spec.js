import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Welcome from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Welcome returns welcome message in 2 paragraphs', () => {

	//given
	const welcome = shallow(<Welcome />);
	
	//when
	let paragraphs = welcome.find('p');
	
	//then
	expect(welcome.find('p')).to.have.length(2);
	expect(paragraphs.at(0).text()).to.equal('Welcome');
	expect(paragraphs.at(1).text()).to.equal('to React');
});