import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookDetails from './index'

Enzyme.configure({ adapter: new Adapter() });

it('BookDetails display book information', () => {

	//given
	const bookDetails = shallow(<BookDetails />);

	//when
	const bookId = bookDetails.find('#bookId').text();
	const title = bookDetails.find('.title').text();
	const author = bookDetails.find('author').text();
	
	//then
	expect(bookId).to.equal('32156');
	expect(title).to.equal('JavaScript: The Good Parts');
	expect(author).to.equal('Douglas Crockford');
});