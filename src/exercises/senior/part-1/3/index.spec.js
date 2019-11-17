import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BrexitDeal from "./index";

Enzyme.configure({ adapter: new Adapter() });

[
  {
    it: "BrexitDeal displays the details of the arrangement",
    response: { status: 200, body: "Thomas the Tank Engine knows it" },
    result: "Great! Thomas the Tank Engine knows it"
  },
  {
    it: "BrexitDeal fails to process the request",
    response: { status: 403, body: "Something went wrong" },
    result: "Something went wrong, please try again in 2 months"
  }
].forEach(scenario => {
  it(scenario.it, () => {
    //given
    const mockApiResponse = () => {
      let { body, status } = scenario.response;
      return new global.Response(JSON.stringify(body), { status });
    };

    sinon.stub(global, "fetch");
    global.fetch
      .withArgs("/rest/brexit-deal")
      .returns(Promise.resolve(mockApiResponse()));

    //when
    const wrapper = shallow(<BrexitDeal />);
    const getDealButton = () => wrapper.find("button");
    const getMessage = () => wrapper.find("[data-message]");

    //then
    expect(getDealButton().text()).to.equal("Get deal!");
    expect(getMessage().text()).to.equal("Click on the button to proceed");

    //when
    getDealButton().simulate("click");

    //then
    expect(getMessage().text()).to.equal("Loading...");
    expect(global.fetch).to.have.callCount(1);

    //when
    setImmediate(() => {
      //then
      expect(getMessage().text()).to.equal(scenario.result);

      //cleanup
      global.fetch.restore();
    });
  });
});
