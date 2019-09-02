import React from 'react';
import renderer from 'react-test-renderer';

import Form from '../Components/Form/Form';

const FormTest = renderer.create(
    <Form mode = 'index' />
);

test('Form test', () => {

    let treeSnapshotForm = FormTest.toJSON();
    expect(treeSnapshotForm).toMatchSnapshot();

    const buttonSend = FormTest.root.find(button => button.props.className === 'form__textInput form__submit');
    buttonSend.props.onClick({stopPropagation: () => null});

    treeSnapshotForm = FormTest.toJSON();
    expect(treeSnapshotForm).toMatchSnapshot();
});