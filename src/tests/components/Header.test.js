import React from 'react';
import { shallow } from 'enzyme';
import {Header} from '../../components/Header';


test('should render header', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});


test('should call startLogout on button click', () => {
    let startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});