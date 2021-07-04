import React, { Component, Fragment } from "react";
import axios from "axios";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import SaleModal from "./SaleModal";
import PaginationComponent from "../services/PaginationComponent";
import moment from "moment";

export class SaleComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sales: [],
			open: false,
			component: "",
			sale: {},
			page: 1,
			itemsPerPage: 5,
		};
	}
	setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};
	componentDidMount() {
		this.getSalesHandler();
	}
	getSalesHandler = async () => {
		const res = await axios.get("https://localhost:5001/api/sales");
		this.setState({ sales: res.data, open: false });
	};
	createSaleHandler = async (customerId, productId, storeId, dateSold) => {
		await axios.post("https://localhost:5001/api/sales", {
			productId: productId,
			customerId: customerId,
			storeId: storeId,
			dateSold: moment(dateSold, "MM/DD/YYYY").add(1, "day")._d,
		});
		this.getSalesHandler();
	};
	editSaleHandler = async (id, customerId, productId, storeId, dateSold) => {
		const saleId = id === undefined ? this.state.sale.saleId : id;
		console.log(
			dateSold === ""
				? moment(this.state.sale.dateSold)._d
				: moment(dateSold, "MM/DD/YYYY").add(1, "day")._d
		);
		await axios.put(`https://localhost:5001/api/sales/${saleId}`, {
			saleId: saleId,
			productId:
				productId === "" ? this.state.sale.product.productId : productId,
			customerId:
				customerId === "" ? this.state.sale.customer.customerId : customerId,
			storeId: storeId === "" ? this.state.sale.store.storeId : storeId,
			dateSold:
				dateSold === ""
					? moment(this.state.sale.dateSold)._d
					: moment(dateSold, "MM/DD/YYYY").add(1, "day")._d,
		});
		this.getSalesHandler();
	};
	deleteSaleHandler = async (id) => {
		await axios.delete(`https://localhost:5001/api/sales/${id}`);
		this.getSalesHandler();
	};
	toggleModalChange = async (value, component, sale) => {
		await this.setState({
			component: component,
			sale: sale,
			open: value,
		});
	};
	handleAscendingOrder = (sales, value) => {
		if (value === "dateSold") {
			this.setState({
				sales: sales.sort((a, b) => {
					let fa = a[value],
						fb = b[value];

					if (fa < fb) {
						return -1;
					}
					if (fa > fb) {
						return 1;
					}
					return 0;
				}),
			});
		} else {
			this.setState({
				sales: sales.sort((a, b) => {
					let fa = a[value][value + "Name"].toLowerCase(),
						fb = b[value][value + "Name"].toLowerCase();

					if (fa < fb) {
						return -1;
					}
					if (fa > fb) {
						return 1;
					}
					return 0;
				}),
			});
		}
	};
	handleDescendingOrder = (sales, value) => {
		if (value === "dateSold") {
			this.setState({
				sales: sales.sort((a, b) => {
					let fa = a[value],
						fb = b[value];

					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
					return 0;
				}),
			});
		} else {
			this.setState({
				sales: sales.sort((a, b) => {
					let fa = a[value][value + "Name"].toLowerCase(),
						fb = b[value][value + "Name"].toLowerCase();

					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
					return 0;
				}),
			});
		}
	};
	render() {
		const { page, itemsPerPage, sales } = this.state;
		const totalPages = this.state.sales.length / itemsPerPage;
		const items = this.state.sales.slice(
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
				<SaleModal
					open={open}
					toggleModalChange={this.toggleModalChange}
					component={this.state.component}
					deleteSaleHandler={this.deleteSaleHandler}
					sale={this.state.sale}
					createSaleHandler={this.createSaleHandler}
					editSaleHandler={this.editSaleHandler}
				/>
				<Button
					size='mini'
					color='blue'
					onClick={() =>
						this.toggleModalChange(true, "create", this.state.sale)
					}
				>
					New Sale
				</Button>
				<Table celled size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								Customer
								<Icon
									onClick={() => this.handleAscendingOrder(sales, "customer")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(sales, "customer")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								Product
								<Icon
									onClick={() => this.handleAscendingOrder(sales, "product")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(sales, "product")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								Store
								<Icon
									onClick={() => this.handleAscendingOrder(sales, "store")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(sales, "store")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								Date Sold{" "}
								<Icon
									onClick={() => this.handleAscendingOrder(sales, "dateSold")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(sales, "dateSold")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{items.map((sale) => (
							<Table.Row key={sale.saleId}>
								<Table.Cell>{sale.customer.customerName}</Table.Cell>
								<Table.Cell>{sale.product.productName}</Table.Cell>
								<Table.Cell>{sale.store.storeName}</Table.Cell>
								<Table.Cell>
									{moment(sale.dateSold).format("DD MMM,YYYY")}
								</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='orange'
										onClick={() => this.toggleModalChange(true, "edit", sale)}
									>
										<Icon name='edit' />
										Edit
									</Button>
								</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='red'
										onClick={() => this.toggleModalChange(true, "delete", sale)}
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

export default SaleComponent;
