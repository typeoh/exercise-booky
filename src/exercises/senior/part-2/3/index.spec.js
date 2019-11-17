import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form from "./index";

Enzyme.configure({ adapter: new Adapter() });

[
  {
    it: "Form displays a button and manages its text (Click to proceed)",
    originalButtonText: "Click to proceed",
    displayedButtonText: "Click to proceed!",
    onButtonClickedText: "Already clicked"
  },
  {
    it: "Form displays a button and manages its text (Click to submit)",
    originalButtonText: "Click to submit",
    displayedButtonText: "Click to submit!",
    onButtonClickedText: "Already clicked"
  }
].forEach(scenario => {
  it(scenario.it, () => {
    const {
      originalButtonText,
      displayedButtonText,
      onButtonClickedText
    } = scenario;
    const onSubmit = sinon.stub();
    const wrapper = mount(
      <Form buttonText={originalButtonText} onSubmit={onSubmit}>
        <Button />
      </Form>
    );

    const button = wrapper.find(Button);

    expect(button.props().buttonText).to.equal(displayedButtonText);
    expect(button.text()).to.equal(displayedButtonText);

    expect(onSubmit).to.have.callCount(0);

    button.simulate("click");

    expect(onSubmit).to.have.been.calledWith(onButtonClickedText);
  });
});
