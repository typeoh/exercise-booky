import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PremierLeagueFixtures from './index'

Enzyme.configure({ adapter: new Adapter() });

it('PremierLeagueFixtures display match results', () => {

	//given
	const premierLeagueFixtures = shallow(
		<PremierLeagueFixtures />
	);
	
	//when
	let fixtures = premierLeagueFixtures.find('.fixtures');
	let fixture = fixtures.find('.fixture');
	
	//then
	expect(fixtures).to.have.length(1);
	expect(fixture).to.have.length(1);

	//and
	expect(fixture.find('.team1').text()).to.equal('Tottenham');
	expect(fixture.find('.team2').text()).to.equal('Southampton');
	expect(fixture.find('.result').text()).to.equal('3-1');
});