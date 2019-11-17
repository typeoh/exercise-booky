import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

[{
	it: 'MoviesApp displays the home page when the current path is "/"',
	currentPath: '/',
	expect: { exists: { home: true }, text: 'Welcome to the Movies app' }
}, {
	it: 'MoviesApp displays the home page for genre selection when ' + 
		'the current path is "/genres"',
	currentPath: '/genres',
	expect: { 
		exists: { genres: true, genresHome: true }, 
		text: 'Please select a genre' 
	}
}, {
	it: 'MoviesApp displays the list of romance movies ' + 
		'when the current path is "/genres/romance"',
	currentPath: '/genres/romance',
	expect: { 
		exists: { genres: true, romanceHome: true }, 
		text: 'A Star Is Born, The Notebook, La La Land' 
	}
}, {
	it: 'MoviesApp displays the list of drama movies ' + 
		'when the current path is "/genres/drama"',
	currentPath: '/genres/drama',
	expect: { 
		exists: { genres: true, dramaHome: true }, 
		text: 'Black Panther, Moonlight, Metropolis' 
	}
}].forEach(scenario => {

	it(scenario.it, () => {

		//given
		const existsPage = page => scenario.expect.exists[page] === true;

		//when
		const wrapper = mount(
			<MemoryRouter initialEntries={[scenario.currentPath]}>
				<MoviesApp />
			</MemoryRouter>
		);

		//then
		expect(wrapper.find(Home).exists()).to.equal(existsPage('home'));
		expect(wrapper.find(Genres).exists())
			.to.equal(existsPage('genres'));
		expect(wrapper.find(GenresHome).exists())
			.to.equal(existsPage('genresHome'));
		expect(wrapper.find(RomanceHome).exists())
			.to.equal(existsPage('romanceHome'));
		expect(wrapper.find(DramaHome).exists())
			.to.equal(existsPage('dramaHome'));
		expect(wrapper.text()).to.equal(scenario.expect.text);
	});
});
