import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'FetchLegend displays the details for Elvis Presley',
	legendId: '1', //Id for Elvis Presley
	fetchResponse: { body: { name: 'elvis presley' }},
	expected: { firstName: 'Elvis', lastName: 'Presley', error: '' }
}, {
	it: 'FetchLegend cannot find the details for Justin Bieber',
	legendId: '2', //Id for Justin Bieber
	fetchResponse: { status: 404 },
	expected: { firstName: '', lastName: '', error: 'Legend not found!' }
}].forEach(scenario => {

	it(scenario.it, () => {

		//given
		const mockApiResponse = () => {
			let { body = {}, status = 200 } = scenario.fetchResponse;
			return new global.Response(JSON.stringify(body), { status });
		};

		sinon.stub(global, 'fetch');
		global.fetch.returns(Promise.resolve(mockApiResponse()));
		
		//when
		const wrapper = shallow(<FetchLegend id={scenario.legendId} />);

		//then
		expect(global.fetch)
			.to.have.been.calledWith(`/rest/legends/${scenario.legendId}`);

		//when
		setImmediate(() => {
			//then
			let { firstName, lastName, error } = scenario.expected;
			expect(wrapper.find('.firstName').text()).to.equal(firstName);
			expect(wrapper.find('.lastName').text()).to.equal(lastName);
			expect(wrapper.find('.error').text()).to.equal(error);
		});

		//cleanup
		global.fetch.restore();
	});
});