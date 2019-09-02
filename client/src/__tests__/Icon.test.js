import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '../Components/Icon/Icon';

const IconTest = renderer.create(
    <Icon path = '/img/logo.png' />
)

test('Icon test', () => {

    let treeIconSnapshot = IconTest.toJSON();
    expect(treeIconSnapshot).toMatchSnapshot();

});