import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import 'regenerator-runtime/runtime' ;
import '@testing-library/jest-dom/extend-expect';


// sample users rendered by UserList
const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

// test rendering user array render a user array
test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

// test rendering from REST retrieve users from REST render users retrieved from REST API
test('user list renders async', async () => {
    const users = await findAllUsers();
    render(
      <HashRouter>
        <UserList users={users}/>
      </HashRouter>);
    const linkElement = screen.getByText(/Forum/i);
    expect(linkElement).toBeInTheDocument();
  })
  