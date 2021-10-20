import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectDetails from '../subjectDetails/SubjectDetails';

export const motherProps = {
  subject: 'mother',
  detailsHeader: "Your mother's details",
  legend: 'Please enter her details',
};

export default function MothersDetailsRoutes() {
  return (
    <Switch>
      <Route path="/mothers-details">
        <SubjectDetails
          subject={motherProps.subject}
          detailsHeader={motherProps.detailsHeader}
          legend={motherProps.legend}
        />
      </Route>
    </Switch>
  );
}
