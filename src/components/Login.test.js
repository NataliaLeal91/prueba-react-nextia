import Login from '../components/Login';
import action from '../actions';

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);


import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import history from '../history';

import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ConnectedRouter } from 'connected-react-router'


configure({ adapter: new Adapter() });


const store = createStore(reducers(history),
  compose(
    applyMiddleware(
      thunk 
    )
  ),
);

// cheatsheet
// https://devhints.io/enzyme
describe('Connected React-Redux Component', () => {

  // wrapper retorna objeto vacío
  const wrapper = shallow(
    <Provider store={store}>
      <Login  />
    </Provider>)

    console.log(wrapper);
    console.log(wrapper.debug());

    expect(wrapper.find('button').length).toEqual(1);

  // wrapper.find('button').simulate('click');
  // expect(props.dispatch).toHaveBeenCalled();
});