import React,{ PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {getPosts, updatePosts} from "../redux/actions/action";
import _ from 'lodash';
import {get} from './../static/defaultPosts';

class Post extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			postDetails: {}
		};
		if(_.isEmpty(this.props.match.params.id)) this.props.history.push(`/`);
	}
	componentDidMount () {
		const {match} = this.props;
		get().then(data=>{
			 const details =_.find(data,{id:Number(match.params.id)});
			 _.isEmpty(details) ? this.props.history.push(`/`) : this.setState({postDetails:details});
		}).catch(err=>{
			console.log(err);
		})
	};
	render () {
		const {postDetails} = this.state;
		return (
			<div id="Post" className="container-fluid">
				{_.isEmpty(postDetails) ? '' :
					<div>
						<img src={postDetails.image} width={200} height={100} />
						<div>
							<span>title:</span>
							<span>{postDetails.title}</span>
						</div>
						<div>
							<span>averagePrice</span>
							<span>{postDetails.averagePrice}</span>
						</div>
					</div>
				}
			</div>
		);
	}
}
const mapStateToProps = state => state;
export default connect(mapStateToProps,{getPosts,updatePosts})(withRouter(Post));
