import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../Components/Footer/Footer';

const FooterTest = renderer.create(
    <Footer footerTitle = 'Test!' />
);

test('Footer test', () => {

    let treeSnapshotFooter = FooterTest.toJSON();
    expect(treeSnapshotFooter).toMatchSnapshot();
});