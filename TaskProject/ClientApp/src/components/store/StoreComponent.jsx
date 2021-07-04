import React, { Component, Fragment } from "react";
import StoreModal from "./StoreModal";
import axios from "axios";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import PaginationComponent from "../services/PaginationComponent";

export class StoreComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [],
			open: false,
			component: "",
			store: {},
			page: 1,
			itemsPerPage: 5,
		};
	}
	setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};
	async componentDidMount() {
		this.getStoresHandler();
	}
	getStoresHandler = async () => {
		const res = await axios.get(
			"https://onboarding-task.azurewebsites.net/api/stores"
		);
		this.setState({ stores: res.data, open: false });
	};
	editStoreHandler = async (id, name, address) => {
		const storeId = id === undefined ? this.state.store.storeId : id;
		await axios.put(
			`https://onboarding-task.azurewebsites.net/api/stores/${storeId}`,
			{
				storeId: storeId,
				storeName: name === "" ? this.state.store.name : name,
				storeAddress: address === "" ? this.state.store.address : address,
			}
		);
		this.getStoresHandler();
	};
	deleteStoreHandler = async (id) => {
		await axios.delete(
			`https://onboarding-task.azurewebsites.net/api/stores/${id}`
		);
		this.getStoresHandler();
	};
	createStoreHandler = async (name, address) => {
		await axios.post(`https://onboarding-task.azurewebsites.net/api/stores/`, {
			storeName: name,
			storeAddress: address,
		});
		this.getStoresHandler();
	};
	toggleModalChange = (value, component, store) => {
		this.setState({ open: value, component: component, store: store });
	};
	handleAscendingOrder = (stores, value) => {
		this.setState({
			stores: stores.sort((a, b) => {
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
	handleDescendingOrder = (stores, value) => {
		this.setState({
			stores: stores.sort((a, b) => {
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
		const { page, itemsPerPage, stores } = this.state;
		const totalPages = this.state.stores.length / itemsPerPage;
		const items = this.state.stores.slice(
			(page - 1) * itemsPerPage,
			(page - 1) * itemsPerPage + itemsPerPage
		);

		const { open } = this.state;
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
				<StoreModal
					open={open}
					toggleModalChange={this.toggleModalChange}
					createStoreHandler={this.createStoreHandler}
					editStoreHandler={this.editStoreHandler}
					deleteStoreHandler={this.deleteStoreHandler}
					store={this.state.store}
					component={this.state.component}
				/>
				<Button
					size='mini'
					color='blue'
					onClick={() =>
						this.toggleModalChange(true, "create", this.state.store)
					}
				>
					New Store
				</Button>
				<Table celled size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								NAME{" "}
								<Icon
									onClick={() => this.handleAscendingOrder(stores, "name")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(stores, "name")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								ADDRESS
								<Icon
									onClick={() => this.handleAscendingOrder(stores, "address")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(stores, "address")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{items.map((store) => (
							<Table.Row key={store.id}>
								<Table.Cell>{store.name}</Table.Cell>
								<Table.Cell>{store.address}</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='orange'
										onClick={() => this.toggleModalChange(true, "edit", store)}
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
											this.toggleModalChange(true, "delete", store)
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

export default StoreComponent;
