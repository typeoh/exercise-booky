import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'RacingDB has already indexed F1 in 1971',
	currentPath: '/results/f1/1971',
	expected: { results: true }
}, {
	it: 'RacingDB has already indexed MotoGP in 1971',
	currentPath: '/results/motogp/1990',
	expected: { results: true }
}, {
	it: 'RacingDB has not indexed MotoGP in 1949 yet',
	currentPath: '/results/motogp/1949',
	expected: { results: false }
}, {
	it: 'RacingDB has not indexed Nascar yet',
	currentPath: '/results/nascar/1984',
	expected: { results: false }
}].forEach(scenario => {

	it(scenario.it, () => {

		//given
		const wrapper = mount(
			<MemoryRouter initialEntries={[scenario.currentPath]}>
				<RacingDB />
			</MemoryRouter>
		);

		//when
		const resultsPage = wrapper.find(ResultsPage);
		const notFoundPage = wrapper.find(NotFoundPage);

		//then
		if(scenario.expected.results) {
			expect(resultsPage.exists()).to.equal(true);
			expect(resultsPage.text()).to.equal(
				'Competition and year correctly indexed'
			);
			expect(notFoundPage.exists()).to.equal(false);
		} else {
			expect(resultsPage.exists()).to.equal(false);
			expect(notFoundPage.exists()).to.equal(true);
			expect(notFoundPage.text()).to.equal(
				'Results for that competition and year are not available'
			);
		}
	});
});