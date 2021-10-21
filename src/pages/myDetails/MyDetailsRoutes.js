import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectDetails from '../subjectDetails/SubjectDetails';

export const userProps = {
  subject: 'subject',
  detailsHeader: 'Your details',
  legend: 'Please enter your details',
};

const { subject, detailsHeader, legend } = userProps;

const MyDetailsRoutes = () => (
  <Switch>
    <Route path="/my-details">
      <SubjectDetails
        subject={subject}
        detailsHeader={detailsHeader}
        legend={legend}
      />
    </Route>
  </Switch>
);

export { MyDetailsRoutes };
