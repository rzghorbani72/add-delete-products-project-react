import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
	render () {
		return (
			<div className={`header`}>
				<div className={`nav`}>
					<Link to="/" className="nav-item nav-link active ">خانه</Link>
					<Link to="/about" className="nav-item nav-link ">درباره‌ما</Link>
				</div>
			</div>
		);
	}
}

export default Header;
