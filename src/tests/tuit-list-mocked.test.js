import {Tuits} from "../components/tuits/index";
import {screen} from "@testing-library/react";
import {render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  {tuit: "alice's tuit", postBy: "1234", _id: "ab789"},
  {tuit: "bob's tuit", postBy: "a23445", _id: "al908"},
  {tuit: "charlie's tuit", postBy: "a789", _id: "bb789"}
];

//test tuit list renders mocked
test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;
    render(
    <HashRouter>
        <Tuits tuits={tuits}/>
    </HashRouter>);
    const tuit = screen.getByText(/charlie's tuit/i);
    expect(tuit).toBeInTheDocument();
});