import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WorldChampions from './index'

Enzyme.configure({ adapter: new Adapter() });

it('WorldChampions filters out the non-champion drivers', () => {

	//given
	const worldChampions = shallow(<WorldChampions drivers={[
		{ name: 'Nigel Mansell', isWorldChampion: true },
		{ name: 'Keke Rosbert', isWorldChampion: false },
		{ name: 'Alain Prost', isWorldChampion: true }
	]} />);

	//when
	let labels = worldChampions.find('label');
	
	//then
	expect(labels).to.have.length(2);
	expect(labels.at(0).text()).to.equal('Nigel Mansell');
	expect(labels.at(1).text()).to.equal('Alain Prost');
});