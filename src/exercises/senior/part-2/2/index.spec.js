import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DOM from "./index";

Enzyme.configure({ adapter: new Adapter() });

it("DOM manipulates the attributes of a node element", () => {
  //given
  let node = null;
  const wrapper = mount(<DOM onClick={n => (node = n)} />);
  const button = wrapper.find("button");

  //when
  button.simulate("click");

  //then
  expect(node.getAttribute("key-1")).to.equal("value-1");
  expect(node.attributes.length).to.be.below(3);

  //when
  button.simulate("click");

  //then
  expect(node.getAttribute("key-2")).to.equal("value-2");
  expect(node.attributes.length).to.be.below(3);

  //when
  button.simulate("click");

  //then
  expect(node.getAttribute("key-3")).to.equal("value-3");
  expect(node.attributes.length).to.be.below(3);
});
