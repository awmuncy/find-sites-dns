import React from "react";
import ReactDOM from "react-dom";
import Provider from "./provider.js";

		var websites_urls = [
			"https://www.facebook.com",
			"https://www.google.com"
		];

		var websites_to_check = websites_urls.filter(function(item){
			if(item.endsWith(".dev")) {
				return false;
			}
			return true;
		});

Array.prototype.delayedForEach = function(callback, timeout, thisArg){
  var i = 0,
    l = this.length,
    self = this,
    caller = function(){
      callback.call(thisArg || self, self[i], i, self);
      (++i < l) && setTimeout(caller, timeout);
    };
  caller();
};


class SiteProviders extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			providers: [],
		}

		this.pullSiteData = this.pullSiteData.bind(this);
	}



	async pullSiteData(website_list) {


		async function check_url(website) {
			var api_raw = await fetch("http://ip-api.com/json/" + website);
			var api_json = await api_raw.json();
			var ip = api_json.query;


			return api_json;
		}

		website_list.delayedForEach(async (item) => {

			var json = await check_url(item);

			if(json.status=="fail") {
				console.warn(json.query + " failed");
				return;
			}

			var checkProvider = function(provider_to_check){
				if(json.org===provider_to_check.org) {
					return true;
				}
				return false;
			}

			var currentList = [...this.state.providers];

			var item_provider_key = currentList.findIndex(checkProvider);

			var item_obj = {
				title: item,
				ip: json.query
			}
			if(item_provider_key>-1) {				
				currentList[item_provider_key].sites.push(item_obj);
			} else {
				var item_provider = currentList.push({
					org: json.org,
					sites: [item_obj]
				});

			}

			this.setState({
				providers: currentList
			})



		}, 500);
	
		return true;
	}

	componentDidMount() {
		this.pullSiteData(websites_to_check);
	}

	render() {
		return (
			<div className="sites_and_providers">
				<table>
					<tbody>			
						<tr>
							<th>
								Provider
							</th>
							<th>
								Site
							</th>
							<th>
								IP  
							</th>
						</tr>
						{
							this.state.providers.map(function(provider, key){
								return <Provider key={key} sites={provider.sites} ip={provider.ip} org={provider.org} />
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}



export default SiteProviders;