import { Route, Switch } from 'react-router-dom';
import { MyDetails } from './MyDetails';

export const userProps = {
  subject: 'subject',
  detailsHeader: 'Your details',
  legend: 'Please enter your details',
};

const MyDetailsRoutes = () => (
  <Switch>
    <Route path="/my-details">
      <MyDetails />
    </Route>
  </Switch>
);

export { MyDetailsRoutes };
