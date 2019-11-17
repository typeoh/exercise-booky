import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'Heaven sends an informative message to Hell ' +
		'and gets feedback from there via purgatory',
	message: 'here I am'
}, {
	it: 'Heaven sends a question to Hell ' +
		'and gets feedback from there via purgatory',
	message: 'how are you doing'
}].forEach(scenario => {

	it(scenario.it, () => {

		//given
		const message = scenario.message;
		const onSubmit = sinon.stub();
		const heaven = mount(
			<Heaven message={message} onSubmit={onSubmit} />
		);
		const purgatory = heaven.find(Purgatory);
		const hell = purgatory.find(Hell);

		//when
		const getOutFromHeavenStub = sinon
			.stub(Heaven.prototype, 'getOutFromHeaven')
			.callThrough();
		const getOutFromPurgatoryStub = sinon
			.stub(Purgatory.prototype, 'getOutFromPurgatory')
			.callThrough();
		const getOutFromHellStub = sinon
			.stub(Hell.prototype, 'getOutFromHell')
			.callThrough();

		//then
		expect(purgatory.props().message).to.equal(`${message} indeed`);
		expect(hell.props().message).to.equal(`Yes, ${message} indeed`);

		//when
		hell.find('button').simulate('click');
		
		//then
		expect(getOutFromHellStub)
			.to.have.been.calledWith(`Yes, ${message} indeed!`);
		expect(getOutFromPurgatoryStub)
			.to.have.been.calledWith(`Yes, ${message} indeed!!`);
		expect(getOutFromHeavenStub)
			.to.have.been.calledWith(`Yes, ${message} indeed!!!`);
		expect(onSubmit)
			.to.have.been.calledWith(`Yes, ${message} indeed!!!`);
			
		//cleanup
		getOutFromHeavenStub.restore();
		getOutFromPurgatoryStub.restore();
		getOutFromHellStub.restore();
	});
});
