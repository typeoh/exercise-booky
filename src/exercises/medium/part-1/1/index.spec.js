import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CaptainTsubasaPlayer from './index'

Enzyme.configure({ adapter: new Adapter() });

it('CaptainTsubasaPlayer displays details for Kojiro Hyuga', () => {

	//given
	const wrapper = mount(<CaptainTsubasaPlayer />);

	//when
	const name = wrapper.find(Name);
	const position = wrapper.find(Position);

	//then
	expect(wrapper.state().name).to.equal('Kojiro Hyuga');
	expect(wrapper.state().position).to.equal('Forward');

	//and
	expect(name.props().name).to.equal('Kojiro Hyuga');
	expect(name.text()).to.equal('Name: Kojiro Hyuga');

	//and
	expect(position.props().position).to.equal('Forward');
	expect(position.text()).to.equal('Position: Forward');
});