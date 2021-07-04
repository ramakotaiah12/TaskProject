import React, { Component } from "react";

import { Button, Modal, Form, Icon } from "semantic-ui-react";
export class StoreModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeName: "",
			storeAddress: "",
		};
	}
	createHandler = () => {
		this.props.createStoreHandler(
			this.state.storeName,
			this.state.storeAddress
		);
		this.setState({
			storeName: "",
			storeAddress: "",
		});
	};
	editHandler = () => {
		this.props.editStoreHandler(
			this.props.store.id,
			this.state.storeName,
			this.state.storeAddress
		);
		this.setState({
			storeName: "",
			storeAddress: "",
		});
	};
	render() {
		return (
			<div>
				{this.props.component === "delete" ? (
					<Modal open={this.props.open}>
						<Modal.Header>Delete Store</Modal.Header>
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
									this.props.deleteStoreHandler(this.props.store.id)
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
						<Modal.Header>Edit Store</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>NAME</label>
									<input
										defaultValue={this.props.store.name}
										onChange={(e) =>
											this.setState({ storeName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>ADDRESS</label>
									<input
										defaultValue={this.props.store.address}
										onChange={(e) =>
											this.setState({ storeAddress: e.target.value })
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
								{" "}
								Edit
								<Icon name='checkmark' />
							</Button>
						</Modal.Actions>
					</Modal>
				) : (
					<Modal open={this.props.open}>
						<Modal.Header>Create Store</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field>
									<label>NAME</label>
									<input
										placeholder='Store Name'
										onChange={(e) =>
											this.setState({ storeName: e.target.value })
										}
									/>
								</Form.Field>
								<Form.Field>
									<label>ADDRESS</label>
									<input
										placeholder='Address'
										onChange={(e) =>
											this.setState({ storeAddress: e.target.value })
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
								onClick={() => this.createHandler()}
								disabled={
									this.state.storeName.length < 1 ||
									this.state.storeAddress.length < 1
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

export default StoreModal;
