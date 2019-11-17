import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieDB from "./index";

Enzyme.configure({ adapter: new Adapter() });

[
  {
    it: "MovieDB displays a list of action movies",
    genre: "action",
    results: [
      { title: "RoboCop", year: 1987 },
      { title: "Total Recall", year: 1990 },
      { title: "Starship Troopers", year: 1997 }
    ]
  },
  {
    it: "MovieDB displays a list of thriller movies",
    genre: "thriller",
    results: [{ title: "Basic Instinct", year: 1992 }]
  }
].forEach(scenario => {
  it(scenario.it, () => {
    //given
    const { genre, results } = scenario;
    const movies = [
      { title: "RoboCop", genre: "action", year: 1987 },
      { title: "Basic Instinct", genre: "thriller", year: 1992 },
      { title: "Total Recall", genre: "action", year: 1990 },
      { title: "Starship Troopers", genre: "action", year: 1997 }
    ];

    const directorId = "5c98b903358";
    const wrapper = shallow(<MovieDB directorId={directorId} />);
    const getGenreSelector = () => wrapper.find("select");
    const getMovies = () => wrapper.find(".movie");
    const endpoint = `/rest/movies/${directorId}?genre=${genre}`;

    const mockApiResponse = () => {
      let search = endpoint.split("?")[1];
      let params = new URLSearchParams(search);
      let genre = params.get("genre");
      let body = movies.filter(movie => movie.genre === genre);
      let status = 200;
      return new global.Response(JSON.stringify(body), { status });
    };

    sinon.stub(global, "fetch");
    global.fetch.withArgs(endpoint).returns(Promise.resolve(mockApiResponse()));

    //when
    getGenreSelector().simulate("change", { target: { value: genre } });

    //and
    setImmediate(() => {
      //then
      expect(getMovies()).to.have.length(results.length);
      results.forEach((result, index) => {
        expect(
          getMovies()
            .at(index)
            .text()
        ).to.equal(`${result.title} (${result.year})`);
      });

      //cleanup
      global.fetch.restore();
    });
  });
});
