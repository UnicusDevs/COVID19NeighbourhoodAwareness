import React from 'react';
import { shallow } from 'enzyme';
import {SignUpForm} from './../../components/SignUpForm';
import userData from './../mockData/userData';
import toJson from 'enzyme-to-json';


test('Should render SignUpForm correctly', () => { 
  const component = shallow(<SignUpForm />);
  expect(toJson(component)).toMatchSnapshot();
});

// test('Should throw validation errors', () => {

//   const component = shallow(
//     <SignUpForm />
//   );

//   component.find('form').simulate('submit', {
//     preventDefault: () => {}
//   });

//   expect(component.find({errors}).length).toBeGreaterThan(0);
//   expect(component).toMatchSnapshot();
// });

test('Should change on first name', () => {
  const component = shallow(<SignUpForm />);
  const value = 'Joe';
  
  component.find('input').at(1).simulate('change', {target: {value: value}})

  expect(component).toBe(value);
})