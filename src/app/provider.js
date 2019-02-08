import React from "react";
import ReactDOM from "react-dom";
import Site from "./Site.js";

class Provider extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<React.Fragment>
				<tr>
					<td>
						{this.props.org}
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				{
					this.props.sites.map((site, key) => {
						return <Site key={key} title={site.title} ip={site.ip} />;
					})
				}
			</React.Fragment>
		);
	}
}



export default Provider;