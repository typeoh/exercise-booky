import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ChallengeResults from './index'

Enzyme.configure({ adapter: new Adapter() });

it(`
	ChallengeResults displays a "keep training" message 
	when the average results are < 50
`, () => {

	//when
	const welcome = shallow(
		<ChallengeResults scores={[34, 54, 34, 23]} />
	);

	//then
	expect(welcome.text()).to.equal('Keep training!');
});