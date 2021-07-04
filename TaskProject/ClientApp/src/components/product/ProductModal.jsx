import React, { Component } from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
export class ProductModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productName: "",
			productPrice: "",
		};
	}
	createHandler = () => {
		this.props.createProductHandler(
			this.state.productName,
			this.state.productPrice
		);
		this.setState({
			productName: "",
			productPrice: "",
		});
	};
	editHandler = () => {
		this.props.editProductHandler(
			this.props.product.id,
			this.state.productName,
			this.state.productPrice
		);
		this.setState({
			productName: "",
			productPrice: "",
		});
	};
	render() {
		return (
			<div>
				{this.props.component === "delete" ? (
					<Modal open={this.props.open}>
						<Modal.Header>Delete Customer</Modal.Header>
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
									this.props.deleteProductHandler(this.props.product.id)
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
						<Modal.Header>Edit Product</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Product Name</label>
									<input
										defaultValue={this.props.product.name}
										onChange={(e) =>
											this.setState({ productName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>Price</label>
									<input
										defaultValue={this.props.product.price}
										onChange={(e) =>
											this.setState({ productPrice: e.target.value })
										}
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
								onClick={() => this.editHandler()}
								size='mini'
								color='green'
								icon
								labelPosition='right'
							>
								{" "}
								Edit
								<Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				) : (
					<Modal open={this.props.open}>
						<Modal.Header>Create Product</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Product Name</label>
									<input
										placeholder='Product Name'
										onChange={(e) =>
											this.setState({ productName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>Price</label>
									<input
										placeholder='Price'
										onChange={(e) =>
											this.setState({ productPrice: e.target.value })
										}
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
								disabled={
									this.state.productName.length < 1 ||
									this.state.productPrice.length < 1
								}
								onClick={() => this.createHandler()}
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

export default ProductModal;
