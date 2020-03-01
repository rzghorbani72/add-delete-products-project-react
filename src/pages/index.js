import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {isEmpty} from 'lodash';
import { updatePosts,getPosts} from "../redux/actions/action";
import {GET_POSTS} from "../redux/actions/type";

class Index extends React.Component {
	componentDidMount() {
		this.props.getPosts(GET_POSTS);
	}
	render () {
		const {postsInfo} = this.props;
		const posts = postsInfo.posts;
		return (
			<div id="Index" className="container-fluid">
				<button onClick={()=> this.props.getPosts()} className="alert alert-light">بارگیری مجدد آیتم ها</button>
				{isEmpty(posts) ? '' :
					posts.map((item,i)=>(
						<div key={i}>
							<a href={`/post/${item.id}`}>{item.title}</a>
							<button onClick={()=> this.props.updatePosts(item.id)}>delete</button>
						</div>
					))
				}
			</div>
		);
	}
}
const mapStateToProps = state => state;
export default connect(mapStateToProps,{getPosts,updatePosts})(withRouter(Index));
