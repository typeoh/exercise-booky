import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import  from './index'

Enzyme.configure({ adapter: new Adapter() });

it('PortfolioApp navigates from: Home -> Projects -> About', () => {

	//given
	const wrapper = mount(
		<MemoryRouter initialEntries={['/']}>
			<PortfolioApp/>
		</MemoryRouter>
	);

	//when
	const getHome = () => wrapper.find(Home);
	const getProjects = () => wrapper.find(Projects);
	const getAbout = () => wrapper.find(About);
	const getProjectsLink = () => getHome().find('Link[to="/projects"] a');
	const getAboutLink = () => getProjects().find('Link[to="/about"] a');

	//then
	expect(getHome().exists()).to.equal(true);
	expect(getProjects().exists()).to.equal(false);
	expect(getAbout().exists()).to.equal(false);
	expect(getProjectsLink().text()).to.equal('Projects');
	expect(getProjectsLink().prop('href')).to.equal('/projects');

	//when
	getProjectsLink().simulate('click');

	//then
	expect(getHome().exists()).to.equal(false);
	expect(getProjects().exists()).to.equal(true);
	expect(getAbout().exists()).to.equal(false);
	expect(getAboutLink().text()).to.equal('About');
	expect(getAboutLink().prop('href')).to.equal('/about');

	//when
	getAboutLink().simulate('click');

	//then
	expect(getHome().exists()).to.equal(false);
	expect(getProjects().exists()).to.equal(false);
	expect(getAbout().exists()).to.equal(true);
	expect(getAbout().text()).to.equal('About me');
});