import { Route, Switch } from 'react-router-dom';
import { MyDetails } from './MyDetails';

const MyDetailsRoutes = () => (
  <Switch>
    <Route path="/my-details">
      <MyDetails />
    </Route>
  </Switch>
);

export { MyDetailsRoutes };
