[Nested Routes](#top)
  
- [static Nested Routes](#static-nested-routes)
- [dynamic Nested Routes](#dynamic-nested-routes)

---------------------------------------------------------------------------------------------

## static Nested Routes

![Nested Routes](./images/NestedRoutes.png)

```javascript
const App = () => {
  return (
    <>
      <h1>React Router</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/user">User</Link>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />}>
          // the default route will be the /profile route
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
// user.tsx
import { Routes, Route, Link, Outlet } from 'react-router-dom';
const User = () => {
  return (
    <>
      <h1>User</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="account">Account</Link>
      </nav>
      <Outlet />   //the crucial Outlet component
    </>
  );
};
```

[⬆ back to top](#top)

## dynamic Nested Routes

```javascript
// sample 1
const App = () => {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];
  return (
    <>
      <h1>React Router</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users users={users} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};
// user.tsx
const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}> {user.fullName}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};
// sample 2- pass url params
const App = () => {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];
  return (
    <>
      <h1>React Router</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users users={users} />} >
              <Route path=":userId" element={<User />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};
// user.tsx
import { useParams } from 'react-router-dom';
const Users = () => {
  const { userId } = useParams();
  return (
    <>
      <h2>User: {userId}</h2>
      <Link to="/users">Back to Users</Link>
    </>
  );
};
```

> [React Router 6: Nested Routes](https://www.robinwieruch.de/react-router-nested-routes/)

[⬆ back to top](#top)
