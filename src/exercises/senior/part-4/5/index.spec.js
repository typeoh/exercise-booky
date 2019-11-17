import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EvilSignInForm from "./index";

Enzyme.configure({ adapter: new Adapter() });

[
  {
    it: "EvilSignInForm propagates an altered email from the US",
    form: { email: "donald@trump.com", password: "AmericaFirst" },
    expected: { email: "trump@donald.com", password: btoa("AmericaFirst") }
  },
  {
    it: "EvilSignInForm propagates an altered email from the UK",
    form: { email: "theresa@may.gov", password: "Brexit" },
    expected: { email: "may@theresa.gov", password: btoa("Brexit") }
  }
].forEach(scenario => {
  it(scenario.it, () => {
    //given
    let submitted = false;
    const wrapper = shallow(
      <EvilSignInForm
        onSubmit={form => {
          submitted = true;

          //then
          expect(form.email).to.equal(scenario.expected.email);
          expect(form.password).to.equal(scenario.expected.password);
        }}
      />
    );
    const email = wrapper.find('input[type="email"]');
    const password = wrapper.find('input[type="password"]');
    const submitButton = wrapper.find('input[type="submit"]');
    const setValue = (input, value) => {
      input.simulate("change", { target: { value } });
    };

    //when
    setValue(email, scenario.form.email);
    setValue(password, scenario.form.password);
    submitButton.simulate("click");

    //then
    expect(submitted).to.equal(true);
  });
});
