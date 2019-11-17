import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Submit from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Submit shows the submission progress', async () => {

	//when
	const wrapper = shallow(<Submit />);
	const getPressMeButton = () => wrapper.find('button');

	//then
	expect(getPressMeButton().text()).to.equal('Press to submit');

	//when
	getPressMeButton().simulate('click');

	//then
	expect(getPressMeButton().text()).to.equal('Submitting...');

	//when
	await new Promise(resolve => setTimeout(resolve, 1000));

	//then
	expect(getPressMeButton().text()).to.equal('Done!');
});