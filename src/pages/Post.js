import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {getPostsAction, updatePostsAction} from "../redux/actions/action";
import _ from 'lodash';
import {get} from './../static/defaultPosts';
import Header from "../components/header";

class Post extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			postDetails: {}
		};
		if (_.isEmpty(this.props.match.params.id)) this.props.history.push(`/`);
	}
	
	componentDidMount() {
		const {match} = this.props;
		get()
			.then(data => {
				const details = _.find(data, {id: Number(match.params.id)});
				_.isEmpty(details) ? this.props.history.push(`/`) : this.setState({postDetails: details});
			})
			.catch(err => {
				console.log(err);
			})
	};
	
	render() {
		const {postDetails} = this.state;
		return (
			<React.Fragment>
			<Header/>
			<div id="Post" className="pageWrapper col-12 row">
				<div className={`col-lg-3 col-sm-12`}/>
				{_.isEmpty(postDetails) ? '' :
					<div className={`col-lg-6 col-sm-12 cardWrapper`}>
						<div className={`card`}>
							<img src={postDetails.image} width={500} height={400} alt={postDetails.title}/>
							<div className={`itemName`}>
								<span>نام مغازه : </span>
								<span>{postDetails.title}</span>
							</div>
							<div className={`desctiption`}>
								<span>آدرس : </span>
								<span>{postDetails.address}</span>
							</div>
							<div className={`desctiption`}>
								<span>توضیحات : </span>
								<span>{postDetails.description}</span>
							</div>
						</div>
					</div>
				}
				<div className={`col-lg-3 col-sm-12`}/>
			</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
	getPostsAction,
	updatePostsAction
})(withRouter(Post));
