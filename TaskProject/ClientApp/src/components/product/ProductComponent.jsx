import React, { Component, Fragment } from "react";
import ProductModal from "./ProductModal";
import axios from "axios";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import PaginationComponent from "../services/PaginationComponent";

export class ProductComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			open: false,
			product: {},
			component: "",
			page: 1,
			itemsPerPage: 5,
		};
	}
	setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};
	async componentDidMount() {
		this.getProductsHandler();
	}
	getProductsHandler = async () => {
		const res = await axios.get("https://localhost:5001/api/products");
		this.setState({ products: res.data, open: false });
	};
	editProductHandler = async (id, name, price) => {
		const productId = id === undefined ? this.state.customer.customerId : id;
		await axios.put(`https://localhost:5001/api/products/${productId}`, {
			productId: productId,
			productName: name === "" ? this.state.product.name : name,
			productPrice: price === "" ? this.state.product.price : price,
		});
		this.getProductsHandler();
	};
	deleteProductHandler = async (id) => {
		await axios.delete(`https://localhost:5001/api/products/${id}`);
		this.getProductsHandler();
	};
	createProductHandler = async (name, price) => {
		await axios.post(`https://localhost:5001/api/products/`, {
			productName: name,
			productPrice: price,
		});
		this.getProductsHandler();
	};
	toggleModalChange = (value, component, product) => {
		this.setState({ open: value, component: component, product: product });
	};
	handleAscendingOrder = (products, value) => {
		if (value === "name") {
			this.setState({
				products: products.sort((a, b) => {
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
		} else {
			this.setState({
				products: products.sort((a, b) => {
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
		}
	};
	handleDescendingOrder = (products, value) => {
		if (value === "name") {
			this.setState({
				products: products.sort((a, b) => {
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
		} else {
			this.setState({
				products: products.sort((a, b) => {
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
		}
	};
	render() {
		const { page, itemsPerPage, products } = this.state;
		const totalPages = this.state.products.length / itemsPerPage;
		const items = this.state.products.slice(
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
				<ProductModal
					open={open}
					toggleModalChange={this.toggleModalChange}
					product={this.state.product}
					component={this.state.component}
					editProductHandler={this.editProductHandler}
					createProductHandler={this.createProductHandler}
					deleteProductHandler={this.deleteProductHandler}
				/>
				<Button
					size='mini'
					color='blue'
					onClick={() =>
						this.toggleModalChange(true, "create", this.state.product)
					}
				>
					New Product
				</Button>
				<Table celled size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								NAME
								<Icon
									onClick={() => this.handleAscendingOrder(products, "name")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(products, "name")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>
								PRICE
								<Icon
									onClick={() => this.handleAscendingOrder(products, "price")}
									style={{ cursor: "pointer" }}
									name='angle up'
								></Icon>
								<Icon
									onClick={() => this.handleDescendingOrder(products, "price")}
									style={{ cursor: "pointer" }}
									name='angle down'
								></Icon>
							</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
							<Table.HeaderCell>ACTION</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{items.map((product) => (
							<Table.Row key={product.id}>
								<Table.Cell>{product.name}</Table.Cell>
								<Table.Cell>{product.price}</Table.Cell>
								<Table.Cell>
									<Button
										size='mini'
										color='orange'
										onClick={() =>
											this.toggleModalChange(true, "edit", product)
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
											this.toggleModalChange(true, "delete", product)
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

export default ProductComponent;
