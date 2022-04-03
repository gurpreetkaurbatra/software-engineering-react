import { act } from 'react-dom/test-utils';
import Profile from "../components/profile/index"
import MyDislikes from "../components/profile/my-dislikes"
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

const MOCKED_USER = {username: "bob", _id: "234"};
const MOCKED_TUIT =
    [{tuit: "bob's tuit", postBy: "234", _id: "2341", stats: {likes: 42, dislikes: 12}}];

const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)

test('renders dislikes tab on profile', async() => {
    mockAxios.get.mockImplementation(() =>
        Promise.resolve({ data: MOCKED_USER }));
    
    await act( async () => render(
        <HashRouter>
            <Profile />
        </HashRouter>
    ));

    const dislikeTab = screen.getByText(/Dislikes/i);
    expect(dislikeTab).toBeInTheDocument();
})