import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ScoreDetails from './index'

Enzyme.configure({ adapter: new Adapter() });

it('ScoreDetails displays details (2 values passed)', () => {

	//given
	const scores = [54, 65];
	
	//when
	const scoreDetails = shallow(<ScoreDetails scores={scores} />);
	
	//then
	expect(scoreDetails.find('.total').text()).to.equal('Total: 2');
	expect(scoreDetails.find('.first').text()).to.equal('First: 54');
	expect(scoreDetails.find('.second').text()).to.equal('Second: 65');
});