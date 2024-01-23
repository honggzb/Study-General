[Nested Routes](#top)
  
- [static Nested Routes](#static-nested-routes)
- [dynamic Nested Routes](#dynamic-nested-routes)
  - [sample 1](#sample-1)
  - [sample 2: useParams](#sample-2-useparams)
  - [sample 3](#sample-3)
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

### sample 1

- star segment here is used for matching URLs to routes
- It are called path patterns. Because of this path pattern, for example, you can have any number of segments in the child URL.
  - `localhost:3000/service/development/teams`, `localhost:3000/service/development/teams/projects`
- `<Outlet>` is to render the child route element within the parent route element.

```javascript
// sample 1
const App = () => {
  return (
    <>
      <nav>
       //...
      </nav>
      <Routes>
        <Route index  path="/" Component={ Home } />
        <Route path="service/*" Component={ Service }>
               <Route path="development" Component={ Development } />
               <Route path="consult" Component={ Consult } />              
        </Route>
        <Route path="about" Component={ About } />         
      </Routes>
    </>
  );
};
// 
import { Outlet } from 'react-router-dom'
export default function Service() {
  return (
    <div>
        <h2>Our Services</h2>       
     	 <div>
              <ul>
                 <li>Software developement</li>
                 <li>Consulting</li>
            </ul>
            <Outlet/>
         </div>
    </div>
  )
}
```

[⬆ back to top](#top)

### sample 2: useParams

```javascript
// sample 2- pass url params
<Routes>
        <Route path="/" Component={ Home } />
        <Route path="service/*" Component={ Service }>
               <Route index Component={ ServicesDesc } />
               <Route path="development" Component={ Development } />
               <Route path="consult" Component={ Consult } />      
               <Route path="team/:teamId" Component={ Team }/> {/*dynamic route*/}      
        </Route>
        <Route path="about" Component={ About } />  
</Routes>
//
import { useParams  } from 'react-router-dom'
export default function Team() {
    const { teamId } = useParams();//teamId is the params passing with the URL
  return (
    <div>
      <h2>Team</h2>
       Your project is assiged to a {  teamId } team
    </div>
  )
}
```

[⬆ back to top](#top)

### sample 3

![dynamicNestedRouter](./images/dynamicNestedRouter.gif)

```javascript
// sample 3
const App = () => {
  const transactions = [
    { id: '1', details: 'Transaction 1' },
    { id: '2', details: 'Transactions 2' },
  ];
return (
    <Router>
      <h1>React Router</h1>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/user">User</Link>
      </nav>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="user" element={<User />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="transactions" element={<Transactions transactions={transactions} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
// 
const Transactions = ({ transactions }) => {
 return (
  <>
   <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link to={transaction.id}> {transaction.details} </Link>
          </li>
        ))}
      </ul>
  </>
 )
}
```

- [How to implement nested Routes in React Router V6](https://www.tecforfun.com/frameworks/how-to-implement-nested-routes-in-react-router-v6/)
- [React Router 6: Nested Routes](https://www.robinwieruch.de/react-router-nested-routes/)
- [How to create nested dynamic routes using React Router v6](https://jnpiyush.medium.com/how-to-create-nested-dynamic-routes-using-react-router-v6-96edc4daa061)

[⬆ back to top](#top)
