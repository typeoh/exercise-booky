import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CoolWords from "./index";

Enzyme.configure({ adapter: new Adapter() });

[
  {
    it: 'CoolWords finds all the words containing "ac"',
    q: "ac",
    results: ["abracadabra", "accoutrements"]
  },
  {
    it: 'CoolWords finds all the words containing "ad"',
    q: "ad",
    results: ["abracadabra", "adagio", "aficionado"]
  }
].forEach(scenario => {
  it(scenario.it, () => {
    //given
    const words = [
      "abecedarian",
      "abracadabra",
      "accoutrements",
      "adagio",
      "aficionado",
      "agita",
      "agog",
      "akimbo",
      "alfresco",
      "aloof",
      "ambrosial",
      "amok",
      "ampersand",
      "anemone",
      "anthropomorphic"
    ];

    const endpoint = `/rest/cool-words?q=${scenario.q}`;
    const mockApiResponse = () => {
      let search = endpoint.split("?")[1];
      let params = new URLSearchParams(search);
      let body = words.filter(word => word.includes(params.get("q")));
      let status = 200;
      return new global.Response(JSON.stringify(body), { status });
    };

    sinon.stub(global, "fetch");
    global.fetch.withArgs(endpoint).returns(Promise.resolve(mockApiResponse()));

    const wrapper = shallow(<CoolWords />);
    const getSearchInput = () => wrapper.find('input[type="text"]');
    const getWords = () => wrapper.find(".word");
    const getResultsMessage = () => wrapper.find(".results");

    //when
    getSearchInput().simulate("change", { target: { value: "a" } });

    //then
    expect(global.fetch).to.have.callCount(0);
    expect(getResultsMessage().text()).to.equal(
      "Please type at least 2 characters"
    );

    //when
    getSearchInput().simulate("change", { target: { value: scenario.q } });

    //and
    setImmediate(() => {
      //then
      expect(getWords()).to.have.length(scenario.results.length);
      scenario.results.forEach((result, index) => {
        expect(
          getWords()
            .at(index)
            .text()
        ).to.equal(result);
      });
      expect(getResultsMessage().text()).to.equal(
        `${scenario.results.length} results found`
      );

      //when
      getSearchInput().simulate("change", { target: { value: "a" } });

      //then
      expect(global.fetch).to.have.callCount(1);
      expect(getResultsMessage().text()).to.equal(
        "Please type at least 2 characters"
      );

      //cleanup
      global.fetch.restore();
    });
  });
});
