import React, { Component } from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
export class CustomerModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerName: "",
			customerAddress: "",
		};
	}

	createHandler = () => {
		this.props.createCustomerHandler(
			this.state.customerName,
			this.state.customerAddress
		);
		this.setState({
			customerName: "",
			customerAddress: "",
		});
	};
	editHandler = () => {
		this.props.editCustomerHandler(
			this.props.customer.id,
			this.state.customerName,
			this.state.customerAddress
		);
		this.setState({
			customerName: "",
			customerAddress: "",
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
									this.props.deleteCustomerHandler(this.props.customer.id)
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
						<Modal.Header>Edit Customer</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Customer Name</label>
									<input
										defaultValue={this.props.customer.name}
										onChange={(e) =>
											this.setState({ customerName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>Address</label>
									<input
										defaultValue={this.props.customer.address}
										onChange={(e) =>
											this.setState({ customerAddress: e.target.value })
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
								onClick={() => this.editHandler()}
							>
								Edit <Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				) : (
					<Modal open={this.props.open}>
						<Modal.Header>Create Customer</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>Customer Name</label>
									<input
										placeholder='Customer Name'
										onChange={(e) =>
											this.setState({ customerName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>Address</label>
									<input
										placeholder='Address'
										onChange={(e) =>
											this.setState({ customerAddress: e.target.value })
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
								disabled={
									this.state.customerName.length < 1 ||
									this.state.customerAddress.length < 1
								}
								size='mini'
								color='green'
								icon
								labelPosition='right'
								onClick={() => this.createHandler()}
							>
								Create <Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				)}
			</div>
		);
	}
}

export default CustomerModal;
