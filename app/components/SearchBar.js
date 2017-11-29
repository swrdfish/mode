import React from 'react'


class SearchBar extends React.Component{
	constructor(props) {
		super(props)
		this.state = {value: ''}
		this.handleOnChange = this.handleOnChange.bind(this)
	}

	handleOnChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<div>
				<input 
					type="text"
					value={this.state.value}
					onChange={this.handleOnChange}
				/>		
			</div>
		)
	}
}
export default SearchBar;
