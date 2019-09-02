import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from '../Components/Header/Header';

const HeaderTest = renderer.create(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
)


test('Header test', () => {

    let treeSnapshot = HeaderTest.toJSON();
    expect(treeSnapshot).toMatchSnapshot();
});