import React, { Component } from "react";
import { Button, Modal, Form, Icon, Dropdown } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import axios from "axios";
import moment from "moment";
export class CreateSale extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			products: [],
			stores: [],
			customerOptions: [],
			productOptions: [],
			storeOptions: [],
			date: "",
			customerId: "",
			productId: "",
			storeId: "",
		};
	}
	createHandler = () => {
		this.props.createSaleHandler(
			this.state.customerId,
			this.state.productId,
			this.state.storeId,
			this.state.date
		);
		this.setState({
			date: "",
			customerId: "",
			productId: "",
			storeId: "",
		});
	};
	editHadler = () => {
		this.props.editSaleHandler(
			this.props.sale.id,
			this.state.customerId,
			this.state.productId,
			this.state.storeId,
			this.state.date
		);
		this.setState({
			date: "",
			customerId: "",
			productId: "",
			storeId: "",
		});
	};

	findDefaultCustomer = () => {
		const something = this.state.customerOptions.find(
			(x) => x.text === this.props.sale.customer.customerName
		);
		return something.value;
	};
	findDefaultProduct = () => {
		const something = this.state.productOptions.find(
			(x) => x.text === this.props.sale.product.productName
		);
		return something.value;
	};
	findDefaultStore = () => {
		const something = this.state.storeOptions.find(
			(x) => x.text === this.props.sale.store.storeName
		);
		return something.value;
	};
	async componentDidMount() {
		const customersRes = await axios.get(
			"https://localhost:5001/api/customers"
		);
		const productsRes = await axios.get("https://localhost:5001/api/products");
		const storesRes = await axios.get("https://localhost:5001/api/stores");
		this.setState({
			customers: customersRes.data,
			products: productsRes.data,
			stores: storesRes.data,
		});
		this.state.customers.map((customer) =>
			this.state.customerOptions.push({
				key: customer.id,
				text: customer.name,
				value: customer.name,
			})
		);
		this.state.products.map((product) =>
			this.state.productOptions.push({
				key: product.id,
				text: product.name,
				value: product.name,
			})
		);
		this.state.stores.map((store) =>
			this.state.storeOptions.push({
				key: store.id,
				text: store.name,
				value: store.name,
			})
		);
	}

	render() {
		return (
			<div>
				{this.props.component === "delete" ? (
					<Modal open={this.props.open}>
						<Modal.Header>Delete Sales</Modal.Header>
						<Modal.Content>Are you sure ?</Modal.Content>
						<Modal.Actions>
							<Button
								size='mini'
								color='black'
								onClick={() => this.props.toggleModalChange(false)}
							>
								Cancel
							</Button>
							<Button
								size='mini'
								color='red'
								icon
								labelPosition='right'
								onClick={() =>
									this.props.deleteSaleHandler(this.props.sale.saleId)
								}
							>
								{" "}
								Delete
								<Icon name='close' />
							</Button>
						</Modal.Actions>
					</Modal>
				) : this.props.component === "edit" ? (
					<Modal open={this.props.open}>
						<Modal.Header>Edit Sales</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Date Sold</label>

									<SemanticDatepicker
										value={moment(this.props.sale.dateSold)._d}
										onChange={(e, d) => this.setState({ date: d.value })}
									/>
								</Form.Field>
								<Form.Field>
									<label>Customer</label>
									<Dropdown
										fluid
										selection
										options={this.state.customerOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ customerId: key });
										}}
										defaultValue={this.findDefaultCustomer()}
									/>
								</Form.Field>
								<Form.Field>
									<label>Product</label>
									<Dropdown
										placeholder='Select Product'
										fluid
										selection
										defaultValue={this.findDefaultProduct()}
										options={this.state.productOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ productId: key });
										}}
									/>
								</Form.Field>
								<Form.Field>
									<label>Store</label>
									<Dropdown
										placeholder='Select Store'
										fluid
										selection
										defaultValue={this.findDefaultStore()}
										options={this.state.storeOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ storeId: key });
										}}
									/>
								</Form.Field>
							</Form>
						</Modal.Content>
						<Modal.Actions>
							<Button
								size='mini'
								color='black'
								onClick={() => this.props.toggleModalChange(false)}
							>
								Cancel
							</Button>
							<Button
								size='mini'
								color='green'
								icon
								labelPosition='right'
								onClick={() => this.editHadler()}
							>
								{" "}
								Edit
								<Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				) : (
					<Modal open={this.props.open}>
						<Modal.Header>Create Sales</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Date Sold</label>
									<SemanticDatepicker
										onChange={(e, d) => this.setState({ date: d.value })}
									/>
								</Form.Field>
								<Form.Field>
									<label>Customer</label>
									<Dropdown
										placeholder='Select Customer'
										fluid
										selection
										options={this.state.customerOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ customerId: key });
										}}
									/>
								</Form.Field>
								<Form.Field>
									<label>Product</label>
									<Dropdown
										placeholder='Select Product'
										fluid
										selection
										options={this.state.productOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ productId: key });
										}}
									/>
								</Form.Field>
								<Form.Field>
									<label>Store</label>
									<Dropdown
										placeholder='Select Store'
										fluid
										selection
										options={this.state.storeOptions}
										onChange={(e, data) => {
											const { value } = data;
											const { key } = data.options.find(
												(x) => x.value === value
											);
											this.setState({ storeId: key });
										}}
									/>
								</Form.Field>
							</Form>
						</Modal.Content>
						<Modal.Actions>
							<Button
								size='mini'
								color='black'
								onClick={() => this.props.toggleModalChange(false)}
							>
								Cancel
							</Button>
							<Button
								size='mini'
								color='green'
								icon
								labelPosition='right'
								onClick={() => this.createHandler()}
								disabled={
									this.state.customerId === "" ||
									this.state.productId === "" ||
									this.state.storeId === "" ||
									this.state.date === ""
								}
							>
								{" "}
								Create
								<Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				)}
			</div>
		);
	}
}

export default CreateSale;
