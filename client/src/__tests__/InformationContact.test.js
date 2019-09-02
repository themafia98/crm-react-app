import React from 'react';
import renderer from 'react-test-renderer';

import InformationContact from '../Components/ContactComponents/InformationContact';

const InformationContactTest = renderer.create(
    <InformationContact />
);

test('ContactComponents information test', () => {

    let treeSnapshotInformationContact = InformationContactTest.toJSON();
    expect(treeSnapshotInformationContact).toMatchSnapshot();
});