import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import NavbarComponent from "./components/services/NavbarComponent";
import CustomerComponent from "./components/customer/CustomerComponent";
import ProductComponent from "./components/product/ProductComponent";
import StoreComponent from "./components/store/StoreComponent";
import SaleComponent from "./components/sale/SaleComponent";
import HomeComponent from "./components/Home/HomeComponent";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Router>
				<Container>
					<NavbarComponent />
					<Route path='/' exact component={HomeComponent} />
					<Route path='/customers' exact component={CustomerComponent} />
					<Route path='/products' exact component={ProductComponent} />
					<Route path='/stores' exact component={StoreComponent} />
					<Route path='/sales' exact component={SaleComponent} />
				</Container>
			</Router>
		);
	}
}
