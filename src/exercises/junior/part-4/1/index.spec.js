import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Actors from './index'

Enzyme.configure({ adapter: new Adapter() });

it('Actors displays a list of 3 actors', () => {

	//given
	const actors = shallow(
		<Actors names={['Arnold', 'Silvester', 'Steven']} />
	);

	//when
	let paragraphs = actors.find('p');

	//then
	expect(paragraphs).to.have.length(3);
	expect(paragraphs.at(0).text()).to.equal('Arnold');
	expect(paragraphs.at(1).text()).to.equal('Silvester');
	expect(paragraphs.at(2).text()).to.equal('Steven');
});