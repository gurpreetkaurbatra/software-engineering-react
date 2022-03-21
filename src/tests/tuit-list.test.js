import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import React from "react";

// jest.mock('axios');

const MOCKED_USERS = [
  {username: 'alice', password: 'alice123', email: 'alice@wonderland.com', _id: "123"},
  {username: 'bob', password: 'bob321', email: 'bob@hope.com', _id: "321"},
  {username: 'charlie', password: 'charlie432', email: 'charlie@peanuts.com', _id: "432"}
];

const MOCKED_TUITS = [
  {_id: "121", tuit: "Alice in wonderland now in cinemas near you!", postedBy: MOCKED_USERS[0]},
  {_id: "131", tuit: "Hoping peace in the world.", postedBy: MOCKED_USERS[1]},
  {_id: "141", tuit: "@SpaceX Dragon spacecraft returns to Earth with @ISS_Research", postedBy: MOCKED_USERS[2]}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/Alice in wonderland now in cinemas near you!/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const  tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(/FSE/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() => Promise.resolve({data: {tuits: MOCKED_TUITS}}));

  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuit = screen.getByText(/Alice in wonderland now in cinemas near you!/i);
  expect(tuit).toBeInTheDocument();
  mock.mockRestore();
});