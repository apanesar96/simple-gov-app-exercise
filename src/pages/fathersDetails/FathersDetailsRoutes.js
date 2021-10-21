import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectDetails from '../subjectDetails/SubjectDetails';

export const fatherProps = {
  subject: 'father',
  detailsHeader: "Your fathers's details",
  legend: 'Please enter his details',
};

const { subject, detailsHeader, legend } = fatherProps;

const FathersDetailsRoutes = () => (
  <Switch>
    <Route path={`/${subject}-details`}>
      <SubjectDetails
        subject={subject}
        detailsHeader={detailsHeader}
        legend={legend}
      />
    </Route>
  </Switch>
);

export { FathersDetailsRoutes };
