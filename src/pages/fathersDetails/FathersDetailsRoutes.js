import { Route, Switch } from 'react-router-dom';
import { FathersDetails } from './FathersDetails';

export const fatherProps = {
  subject: 'father',
  detailsHeader: "Your fathers's details",
  legend: 'Please enter his details',
};

const FathersDetailsRoutes = () => (
  <Switch>
    <Route path="/fathers-details">
      <FathersDetails />
    </Route>
  </Switch>
);

export { FathersDetailsRoutes };
