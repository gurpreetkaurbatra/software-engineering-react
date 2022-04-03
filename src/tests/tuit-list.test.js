import {Tuits} from "../components/tuits/index";
import {screen} from "@testing-library/react";
import {render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

const MOCKED_USERS = [
  {username: "alice", _id: "1234"},
  {username: "bob", _id: "a23445"},
  {username: "charlie", _id: "a789"}
];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", postBy: "1234", _id: "ab789"},
  {tuit: "bob's tuit", postBy: "a23445", _id: "al908"},
  {tuit: "charlie's tuit", postBy: "a789", _id: "bb789"}
];

// test tuit list renders static tuit array
test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>
  );
  const linkElementA = screen.getByText(/alice's tuit/i);
  const linkElementB = screen.getByText(/bob's tuit/i);
  const linkElementC = screen.getByText(/charlie's tuit/i);
  expect(linkElementA).toBeInTheDocument();
  expect(linkElementB).toBeInTheDocument();
  expect(linkElementC).toBeInTheDocument();
});

//test tuit list renders async
test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>
  );
  const linkElement = screen.getByText(/In 2021, our @NASAPersevere/i);
  const linkElementA = screen.getByText(/@SpaceX Dragon spacecraft/i);
  expect(linkElement).toBeInTheDocument()
  expect(linkElementA).toBeInTheDocument()
});