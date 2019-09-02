import React from 'react';
import renderer from 'react-test-renderer';

import RoadCareer from '../Components/AboutComponents/RoadCareer';

const RoadCareerTest = renderer.create(
    <RoadCareer content = 'Hello test done!' />
);

test('RoadCareer test', () => {

    let treeSnapshotRoadCareer = RoadCareerTest.toJSON();
    expect(treeSnapshotRoadCareer).toMatchSnapshot();
});