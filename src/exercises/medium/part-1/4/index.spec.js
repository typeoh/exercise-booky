import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WordOfMouth from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'WordOfMouth distorts a message about a potential new Xbox',
	message: 'New Xbox?', 
	whatFriendASays: 'New Xbox!', 
	whatFriendBSays: 'New Xbox on the 7th'
}, {
	it: 'WordOfMouth distorts a message about a new concert of The Boss',
	message: 'Bruce Springsteen is coming to London?', 
	whatFriendASays: 'Bruce Springsteen is coming to London!', 
	whatFriendBSays: 'Bruce Springsteen is coming to London on the 7th'
}].forEach(scenario => {

	it(scenario.it, () => {

		//given
		let wrapper = mount(<WordOfMouth message={scenario.message} />);
		let friendA = wrapper.find(FriendA);
		let friendB = friendA.find(FriendB);
		let friendC = friendB.find(FriendC);

		//then
		expect(friendA.props().message).to.equal(scenario.message);
		expect(friendB.props().message).to.equal(scenario.whatFriendASays);
		expect(friendC.props().message).to.equal(scenario.whatFriendBSays);
	});
});