import React from 'react';
import renderer from 'react-test-renderer';

import ContentAbout from '../Components/AboutComponents/ContentAbout';

const ContentAboutTest = renderer.create(
    <ContentAbout content = 'Hello test done!' photoUrl = '/img/test.jpg'  />
);

test('ContentAbout test', () => {

    let treeSnapshotContentAbout = ContentAboutTest.toJSON();
    expect(treeSnapshotContentAbout).toMatchSnapshot();
});