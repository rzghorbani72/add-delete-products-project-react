import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
	render () {
		return (
			<header className={`header`}>
				<div className={`nav`}>
					<Link to="/" id="HomeLink" className="nav-item nav-link active ">خانه</Link>
					<Link to="/about" id="AboutLink" className="nav-item nav-link ">درباره‌ما</Link>
				</div>
			</header>
		);
	}
}

export default Header;
