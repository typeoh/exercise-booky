import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddToCartButton from "./index";

Enzyme.configure({ adapter: new Adapter() });

const context = {
  onAddToCartClick: sinon.stub()
};

const AddToCartContext = {
  Consumer(props) {
    return props.children(context);
  }
};

it("function called on click", () => {
  //when
  const wrapper = mount(<AddToCartButton />);
  const getButton = () => wrapper.find("button");

  //then
  expect(getButton().text()).to.equal("Add to the cart");
  expect(context.onAddToCartClick).to.have.callCount(0);

  //when
  getButton().simulate("click");

  //then
  expect(getButton().text()).to.equal("Added!");
  expect(context.onAddToCartClick).to.have.been.calledWith(
    "The item has been added to the basket"
  );

  //when
  getButton().simulate("click");

  //then
  expect(getButton().text()).to.equal("Add to the cart");
  expect(context.onAddToCartClick).to.have.been.calledWith(
    "The item is not on the basket"
  );
});
