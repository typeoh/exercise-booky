import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Log from "./index";

Enzyme.configure({ adapter: new Adapter() });

it("Log reports different events of the component lifecycle", () => {
  //given
  const levels = { INFO: "INFO", WARN: "WARN" };
  const log = { info: sinon.stub(), warn: sinon.stub() };

  //when
  const wrapper = mount(<Log log={log} level={levels.INFO} />);

  //then
  expect(log.info).to.have.been.calledWith("mounted");
  expect(log.info).to.have.callCount(1);
  expect(log.warn).to.have.callCount(0);

  //when
  wrapper.setProps({ level: levels.WARN });

  //then
  expect(log.info).to.have.been.calledWith(
    "will update",
    levels.WARN,
    levels.INFO
  );
  expect(log.warn).to.have.been.calledWith(
    "did update",
    levels.WARN,
    levels.INFO
  );
  expect(log.info).to.have.callCount(2);
  expect(log.warn).to.have.callCount(1);

  //when
  wrapper.unmount();

  //then
  expect(log.warn).to.have.been.calledWith("will unmount", levels.WARN);
  expect(log.info).to.have.callCount(2);
  expect(log.warn).to.have.callCount(2);
});
