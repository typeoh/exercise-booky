import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import User from './index'

Enzyme.configure({ adapter: new Adapter() });

it('User displays name and age details', () => {

	//given
	const user = shallow(<User user={{ name: 'Peter', age: 31 }} />);
	
	//when
	let details = user.find('.detail');
	
	//then
	expect(details).to.have.length(2);
	expect(details.at(0).text()).to.equal('name: Peter');
	expect(details.at(1).text()).to.equal('age: 31');
});