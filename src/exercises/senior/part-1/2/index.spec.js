import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'ImportantPeople displays relevant individuals from the US',
	db: {
		'1': { name: 'R. Reagan', rank: 1 },
		'2': { name: 'M. Luther King', rank: 2 },
		'3': { name: 'A. Lincoln', rank: 3 }
	},
	expected: ['R. Reagan (#1)', 'M. Luther King (#2)', 'A. Lincoln (#3)']
}, {
	it: 'ImportantPeople displays relevant individuals from the UK',
	db: {
		'5c9': { name: 'Sir Winston Churchill', rank: 1 },
		'8b9': { name: 'Charles Darwin', rank: 2 }
	},
	expected: ['Sir Winston Churchill (#1)', 'Charles Darwin (#2)']
}].forEach(scenario => {

	it(scenario.it, () => {
		
		//given
		const mockListApiResponse = (body = {}) => {
			let status = 200;
			return new global.Response(JSON.stringify(body), { status });
		};

		const dbIds = Object.keys(scenario.db);
		sinon.stub(global, 'fetch');
		global.fetch.withArgs('/rest/important-people')
			.returns(Promise.resolve(mockListApiResponse(dbIds)));
			
		dbIds.forEach(id => {
			let data = scenario.db[id];
			global.fetch.withArgs(`/rest/important-people/${id}`)
				.returns(Promise.resolve(mockListApiResponse(data)));
		});

		//when
		const wrapper = shallow(<ImportantPeople />);

		//and
		setImmediate(() => {
			wrapper.update();
			
			//then
			let person = wrapper.find('.person');
			expect(person).to.have.length(scenario.expected.length);
			scenario.expected.forEach((personDetails, index) => {
				expect(person.at(index).text()).to.equal(personDetails);
			});

			//cleanup
			global.fetch.restore();
		});
	});
});