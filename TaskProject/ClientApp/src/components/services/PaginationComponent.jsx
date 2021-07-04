import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";
export class PaginationComponent extends Component {
	render() {
		return (
			<Pagination
				floated='right'
				defaultActivePage={this.props.page}
				totalPages={this.props.totalPages}
				siblingRange={1}
				onPageChange={this.props.setPageNum}
				boundaryRange={0}
				firstItem={null}
				lastItem={null}
				prevItem={null}
				nextItem={null}
			/>
		);
	}
}

export default PaginationComponent;
