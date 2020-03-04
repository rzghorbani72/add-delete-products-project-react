import React from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import {getPostsAction, updatePostsAction} from "../redux/actions/action";
import {GET_POSTS} from "../redux/actions/type";
import Header from "../components/header";

export class Home extends React.Component {
	componentDidMount() {
		this.props.getPostsAction(GET_POSTS);
	}
	render() {
		const {postsInfo} = this.props;
		const posts = isEmpty(postsInfo) ? [] : postsInfo.posts;
		return (
			<React.Fragment>
				<Header/>
				<div id="Index" className="col-12 row pageWrapper">
					<div className={`resetBtn`}>
						<button type='button' onClick={() => this.props.getPostsAction()} className="alert alert-success">بارگیری مجدد آیتم ها</button>
					</div>
					<div className={`container col-12 row`}>
						{isEmpty(posts) ? '' :
							posts.map((info, i) => (
								<div key={i} className={`col-lg-3 col-md-4 col-sm-6 col-xs-12 cardWrapper`}>
									<div className={`card mx-auto`}>
										<img src={info.image} alt={info.title}/>
										<div className={`itemName`}><a href={`/post/${info.id}`}>{info.title}</a></div>
										<div className={`col-12 row`}>
											<div className={`col-lg-6 col-sm-12 alert alert-danger actionBtn deleteBtn`}>
												<button type='button' className={`alert-danger delete-${info.id}`} onClick={() => this.props.updatePostsAction(info.id)}>حذف</button>
											</div>
											<div className={`col-lg-6 col-sm-12 alert alert-info actionBtn`}>
												<a href={`/post/${info.id}`}>
													<button  type='button' className={`alert-info`}>مشاهده جزییات</button>
												</a>
											</div>
										</div>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	...state,
	output: state.output
});
export default connect(mapStateToProps, {
	getPostsAction,
	updatePostsAction
})(Home);
