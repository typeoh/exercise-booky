import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TotalScore from './index'

Enzyme.configure({ adapter: new Adapter() });

it('TotalScore returns the accumulated score (bad results)', () => {

	//when
	const totalScore = shallow(<TotalScore scores={[34, 35, 36]} />);
	
	//then
	expect(totalScore.text()).to.equal('The total score is: 105');
});