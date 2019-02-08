import React from "react";
import ReactDOM from "react-dom";
import SiteProviders from "./providers_and_ips.js";

class App extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="app">
				<h1>Sites and providers</h1>
				<SiteProviders />
			</div>
		);
	}
}



export default App;