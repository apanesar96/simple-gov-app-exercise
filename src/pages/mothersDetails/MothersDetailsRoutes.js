import { Route, Switch } from 'react-router-dom';
import MothersDetails from './MothersDetails';

const MothersDetailsRoutes = () => (
  <Switch>
    <Route path="/mothers-details">
      <MothersDetails />
    </Route>
  </Switch>
);

export { MothersDetailsRoutes };
