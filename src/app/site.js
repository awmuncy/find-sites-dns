import React from "react";
import ReactDOM from "react-dom";


const Site = function(props) {
	return (
		<tr>
			<td>
				{props.org}
			</td>
			<td>
				{props.title}
			</td>
			<td>
				{props.ip}
			</td>
		</tr>
	);
}



export default Site;