import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectDetails from '../subjectDetails/SubjectDetails';

export default function MothersDetailsRoutes() {
  return (
    <Switch>
      <Route path="/mothers-details">
        <SubjectDetails
          subject="mother"
          detailsHeader="Your mother's details"
          legend="Please enter her details"
        />
      </Route>
    </Switch>
  );
}
