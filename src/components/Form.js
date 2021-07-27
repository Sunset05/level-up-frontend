import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        item: "",
        price: "",
        description: "",
        image_url: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitAction(this.state)
    }

    handleChange = (event) => {
    
        let { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const {item, price, description} = this.state
        return (
            <form className="item-form" onSubmit={this.handleSubmit}>
                <h2>Post an Item</h2>
                <label>
                    Item:
                    <input type="text" name="item" value={item} onChange={this.handleChange} />
                </label>
                {/* <label>
                    Image:
                    <input type="text" name="image" value={image} onChange={this.handleChange} />
                </label> */}
                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={this.handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={description} onChange={this.handleChange} />
                </label>
                <input type="submit" />
            </form>
        )
    }
}
