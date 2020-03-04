import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../pages/Home';
import {BrowserRouter, BrowserRouter as Router} from "react-router-dom";
import {get} from "../static/defaultPosts";
import {GET_POSTS, RESET_POSTS, UPDATE_POSTS} from '../redux/actions/type'
import {getPosts, updatePosts} from '../redux/actions/action'
import reducer from '../redux/reducers';
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";
import About from "../pages/About";
import Post from "../pages/Post";
import Header from "../components/header";

Enzyme.configure({adapter: new Adapter()})

function setup(store, page) {
	const props = initialProps;
	const enzymeWrapper = mount(<BrowserRouter>
		<Provider store={store}>
			<Router>
				{page === 'Home' ? <Home {...initialProps}/> :
					page === 'Post' ? <Post {...initialPostProps} /> :
						page === 'About' ? <About/> : <Header/>
				}
			</Router>
		</Provider>
	</BrowserRouter>);
	return {
		props,
		enzymeWrapper
	}
}
function componentRenderer (store,page){
	const component = renderer.create(
		<BrowserRouter>
			<Provider store={store}>
				<Router>
					{page === 'Home' ? <Home {...initialProps}/> :
						page === 'Post' ? <Post {...initialPostProps} /> :
							page === 'About' ? <About/> : <Header/>
					}
				</Router>
			</Provider>
		</BrowserRouter>
	);
	return component;
};
const middlewares = [thunk];
const initialState = {
	errors: {},
	postsInfo: {
		deleted: [],
		posts: []
	},
}
const initialPostProps = {
	match : {
		params:{
			id:1
		}
	}
};
const initialProps = {
	getPosts: jest.fn()
};
const mockStore = configureStore(middlewares);
describe('App Test', () => {
	let store,
		component,
		sampleMockJsonArray = [];
	beforeAll(() => {
		return get()
			.then(data => {
				sampleMockJsonArray = data;
			})
	});

	
	describe('App React-Redux Test', () => {
		
		describe('App snapshots', () => {
				store = mockStore({
					errors: {},
					postsInfo: {posts: sampleMockJsonArray},
					deleted: []
				});
				store.dispatch = jest.fn();
			it('should render HomePage with given state from Redux store', () => {
				component = componentRenderer(store,'Home')
				expect(component.toJSON())
					.toMatchSnapshot();
				expect(store.dispatch.mock.calls)
					.toMatchSnapshot()
			});
			it('should render PostPage with given state from Redux store', () => {
				component = componentRenderer(store,'Post');
				expect(component.toJSON())
					.toMatchSnapshot();
				expect(store.dispatch.mock.calls)
					.toMatchSnapshot()
			});
			it('should render AboutPage with given state from Redux store', () => {
				component = componentRenderer(store,'About');
				expect(component.toJSON())
					.toMatchSnapshot();
				expect(store.dispatch.mock.calls)
					.toMatchSnapshot()
			});
		});
		describe('Actions', () => {
			it('getPosts_Action should fetch [GET_POSTS] dispatch payload', () => {
				const expectedAction = {
					type: GET_POSTS,
					payload: sampleMockJsonArray
				};
				return getPosts(GET_POSTS)
					.then(data => {
						expect(data)
							.toEqual(expectedAction)
					})
			});
			it('getPosts_Action should fetch [RESET_POSTS] dispatch payload', () => {
				const expectedAction = {
					type: RESET_POSTS,
					payload: sampleMockJsonArray
				};
				return getPosts()
					.then(data => {
						expect(data)
							.toEqual(expectedAction)
					})
			});
			it('updatePosts_Action should delete one item and verify dispatch payload', () => {
				const expected = {
					type: UPDATE_POSTS,
					payload: {
						id: 5,
						info: sampleMockJsonArray
					}
				};
				return updatePosts(5)
					.then(data => {
						expect(data)
							.toEqual(expected)
					})
			})
		});
		describe('Reducers', () => {
			it('should return the initial state', () => {
				expect(reducer(undefined, {}))
					.toEqual(initialState)
			});
			it('should handle postReducer', () => {
				expect(
					reducer(initialState, {
						type: GET_POSTS,
						payload: sampleMockJsonArray
					})
				)
					.toEqual(
						{
							errors: {},
							postsInfo: {
								deleted: [],
								posts: sampleMockJsonArray
							}
						}
					);
				
				expect(
					reducer(
						initialState,
						{
							type: RESET_POSTS,
							payload: sampleMockJsonArray
						}
					)
				)
					.toEqual(
						{
							errors: {},
							postsInfo: {
								deleted: [],
								posts: sampleMockJsonArray
							}
						}
					);
				
				expect(
					reducer(
						initialState,
						{
							type: UPDATE_POSTS,
							payload: {
								id: 5,
								info: sampleMockJsonArray
							}
						}
					)
				)
					.toEqual(
						{
							errors: {},
							postsInfo: {
								deleted: [5],
								posts: filteredPosts(sampleMockJsonArray, [5])
							}
						}
					);
				
				function filteredPosts(items, deletedIds) {
					_.remove(items, (item) => {return _.includes(deletedIds, item.id)});
					return items;
				}
			})
		});
	});
	describe('App Components Test', () => {
		describe('App Page self components', () => {
			it('home page self render', () => {
				const {enzymeWrapper} = setup(store,'Home');
				expect(enzymeWrapper.find('.alert-success')
					.text())
					.toEqual('بارگیری مجدد آیتم ها');
			});
			it('header self render', () => {
				const {enzymeWrapper} = setup(store);
				expect(enzymeWrapper.find('#HomeLink')
					.first()
					.text())
					.toEqual("خانه");
				expect(enzymeWrapper.find('#AboutLink')
					.first()
					.text())
					.toEqual("درباره‌ما");
			});
			it('About page self render', () => {
				const {enzymeWrapper} = setup(store,'About');
				expect(enzymeWrapper.find('h2').first()
					.text())
					.toEqual('درباره ما');
			});
		})
	});
});
