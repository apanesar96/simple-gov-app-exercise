import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectDetails from '../subjectDetails/SubjectDetails';

export const motherProps = {
  subject: 'mother',
  detailsHeader: "Your mother's details",
  legend: 'Please enter her details',
};

const { subject, detailsHeader, legend } = motherProps;

export default function MothersDetailsRoutes() {
  return (
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
}
