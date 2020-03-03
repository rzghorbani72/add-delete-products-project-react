import React from 'react';
import renderer from 'react-test-renderer';
import {Home} from '../pages/Home';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Actions to be tested
// import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

Enzyme.configure({adapter: new Adapter()});
const initialProps = {
	getPosts: jest.fn()
};
describe('Home Page', () => {
	let HomePage;
	beforeAll(() => {
		HomePage = shallow(<Home {...initialProps}/>);
	});
	it('capture Snapshot of Home', () => {
		const renderedValue = renderer.create(<Home {...initialProps}/>)
			.toJSON();
		expect(renderedValue)
			.toMatchSnapshot();
	});
	it('reset button content', () => {
		const HomePage = shallow(<Home {...initialProps}/>);
		expect(HomePage.find('.alert-success')
			.text())
			.toEqual('بارگیری مجدد آیتم ها');
	});
});
