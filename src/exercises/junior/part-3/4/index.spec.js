import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmScore from './index'

Enzyme.configure({ adapter: new Adapter() });

it('FilmScore identifies "poor" movies', () => {
	const filmScore = shallow(
		<FilmScore title='Alien vs Predator' score={45} />
	);
	expect(filmScore.text()).to.equal('Poor');
});
