import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Countries from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Countries filters a list of nations', () => {

	//when
	const list = ['Jamaica', 'Japan', 'Jordan'];
	const wrapper = shallow(<Countries list={list} />);
	const getCountries = () => wrapper.find('p');
	const getFilterInput = () => wrapper.find('input');

	//then
	expect(getCountries()).to.have.length(3);
	expect(getCountries().at(0).text()).to.equal('Jamaica');
	expect(getCountries().at(1).text()).to.equal('Japan');
	expect(getCountries().at(2).text()).to.equal('Jordan');

	//when
	getFilterInput().simulate('change', { target: { value: 'Jor' }});

	//then
	expect(getCountries()).to.have.length(1);
	expect(getCountries().at(0).text()).to.equal('Jordan');

	//when
	getFilterInput().simulate('change', { target: { value: 'Ja' }});
	
	//then
	expect(getCountries()).to.have.length(2);
	expect(getCountries().at(0).text()).to.equal('Jamaica');
	expect(getCountries().at(1).text()).to.equal('Japan');
});