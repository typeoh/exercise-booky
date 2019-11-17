import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EurovisionResults from './index'

Enzyme.configure({ adapter: new Adapter() });

it('EurovisionResults fetches and displays some results', async () => {

	//given
	const wrapper = mount(<EurovisionResults />);

	//when
	const getLoading = () => wrapper.find(Loading);
	const getResults = () => wrapper.find('Results');

	//then
	expect(getLoading().exists()).to.equal(true);
	expect(getLoading().text()).to.equal('Loading results...');
	expect(getResults().exists()).to.equal(false);

	//when
	await new Promise(resolve => setTimeout(resolve, 500));
	wrapper.update();

	//then
	expect(getLoading().exists()).to.equal(false);
	expect(getResults().exists()).to.equal(true);
	expect(getResults().text()).to.equal(
		'1. Israel (529p), 2. Cyprus (436p), 3. Austria (342p)'
	);
});