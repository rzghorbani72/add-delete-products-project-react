import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePosts,getPosts} from "../redux/actions/action";
import {isEmpty} from 'lodash';

class Index extends PureComponent {
	componentDidMount() {
		this.props.getPosts();
	}
	
	render () {
		const {postsInfo} = this.props;
		const posts = postsInfo.posts;
		return (
			<div id="Index" className=" container-fluid row">
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
const mapDispatchToProps = dispatch => ({
	updatePosts : id=>dispatch(updatePosts(id)),
	getPosts:()=>dispatch(getPosts())
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Index));
