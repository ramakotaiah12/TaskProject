import React, { Component, Fragment } from "react";
import axios from "axios";
import CustomerModal from "./CustomerModal";

import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import PaginationComponent from "../services/PaginationComponent";
class CustomerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			open: false,
			customer: {},
			component: "",
			page: 1,
			itemsPerPage: 5,
		};
	}
	setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};
	componentDidMount() {
		this.getCustomersHandlers();
	}
	getCustomersHandlers = async () => {
		const res = await axios.get(
			"https://onboarding-task.azurewebsites.net/api/customers"
		);
		this.setState({ customers: res.data, open: false });
	};
	toggleModalChange = async (value, component, customer) => {
		await this.setState({
			open: value,
			component: component,
			customer: customer,
		});
	};
	deleteCustomerHandler = async (id) => {
		await axios.delete(
			`https://onboarding-task.azurewebsites.net/api/customers/${id}`
		);
		this.getCustomersHandlers();
	};
	editCustomerHandler = async (id, name, address) => {
		const customerId = id === undefined ? this.state.customer.customerId : id;
		await axios.put(
			`https://onboarding-task.azurewebsites.net/api/customers/${customerId}`,
			{
				customerId: customerId,
				customerName: name === "" ? this.state.customer.name : name,
				customerAddress: address === "" ? this.state.customer.address : address,
			}
		);
		this.getCustomersHandlers();
	};
	createCustomerHandler = async (name, address) => {
		await axios.post(
			`https://onboarding-task.azurewebsites.net/api/customers/`,
			{
				customerName: name,
				customerAddress: address,
			}
		);
		this.getCustomersHandlers();
	};
	handleAscendingOrder = (customers, value) => {
		this.setState({
			customers: customers.sort((a, b) => {
				let fa = a[value].toLowerCase(),
					fb = b[value].toLowerCase();

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			}),
		});
	};
	handleDescendingOrder = (customers, value) => {
		this.setState({
			customers: customers.sort((a, b) => {
				let fa = a[value].toLowerCase(),
					fb = b[value].toLowerCase();

				if (fa < fb) {
					return 1;
				}
				if (fa > fb) {
					return -1;
				}
				return 0;
			}),
		});
	};
	render() {
		const { page, itemsPerPage, customers, open } = this.state;
		const totalPages = this.state.customers.length / itemsPerPage;
		const items = this.state.customers.slice(
			(page - 1) * itemsPerPage,
			(page - 1) * itemsPerPage + itemsPerPage
		);

		const options = [
			{
				key: 1,
				text: 5,
				value: 5,
			},
			{
				key: 2,
				text: 10,
				value: 10,
			},
			{
				key: 3,
				text: 15,
				value: 15,
			},
		];
		const findDefaultItemsPerPage = () => {
			const option = options.find((x) => x.value === this.state.itemsPerPage);
			return option.value;
		};
		return (
			<Fragment>
				<CustomerModal
					open={open}
					toggleModalChange={this.toggleModalChange}
					component={this.state.component}
					deleteCustomerHandler={this.deleteCustomerHandler}
					customer={this.state.customer}
					editCustomerHandler={this.editCustomerHandler}
					createCustomerHandler={this.createCustomerHandler}
				/>

				<Button
					size='mini'
					color='blue'
					onClick={() =>
						this.toggleModalChange(true, "create", this.state.customer)
					}
				>
					New Customer
				</Button>
				<Table celled size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								NAME
								<Icon
									onClick={() => this.handleAscendingOrder(customers, "name")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(customers, "name")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								ADDRESS
								<Icon
									onClick={() =>
										this.handleAscendingOrder(customers, "address")
									}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() =>
										this.handleDescendingOrder(customers, "address")
									}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{items.map((customer) => (
							<Table.Row key={customer.id}>
								<Table.Cell>{customer.name}</Table.Cell>
								<Table.Cell>{customer.address}</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='orange'
										onClick={() =>
											this.toggleModalChange(true, "edit", customer)
										}
									>
										<Icon name='edit' />
										Edit
									</Button>
								</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='red'
										onClick={() =>
											this.toggleModalChange(true, "delete", customer)
										}
									>
										<Icon name='trash' />
										Delete
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<div>
					<Dropdown
						compact
						selection
						options={options}
						onChange={(e, data) => {
							const { value } = data;
							const { text } = data.options.find((x) => x.value === value);
							this.setState({ itemsPerPage: text, page: 1 });
						}}
						defaultValue={findDefaultItemsPerPage()}
					/>

					<PaginationComponent
						page={page}
						totalPages={totalPages}
						setPageNum={this.setPageNum}
					/>
				</div>
			</Fragment>
		);
	}
}

export default CustomerComponent;
