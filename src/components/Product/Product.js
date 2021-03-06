import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Product.scss";
import { addProductToCart } from "../../actions";
import {
	addWishListAction,
	getWishListsAction,
	deleteWishListAction
} from "../../actions/userAction";
import { withRouter } from "react-router-dom";

class Product extends Component {
	onWishclick = id => {
		if (!this.props.user.isAuthenticate) {
			this.props.history.push("/login");
		} else {
			const {
				wishLists: { wishLists }
			} = this.props.wishList;

			if (wishLists) {
				let counter = 0;
				wishLists.forEach(wishList => {
					if (wishList._id === id) {
						counter++;
					}
				});
				if (counter === 0) {
					this.props.addWishListAction(id);
				}
				if (counter > 0) {
					this.props.deleteWishListAction(id);
				}
			}
		}
	};

	componentWillMount() {
		this.props.getWishListsAction();
	}

	componentDidMount() {}

	render() {
		const { title, price, productImage, category, _id } = this.props.product;

		const {
			wishLists: { wishLists }
		} = this.props.wishList;

		let wishClass = {};

		if (!this.props.user.isAuthenticate) {
			wishClass.heart = "heart";
		} else {
			if (wishLists) {
				if (wishLists.length === 0) {
					wishClass.heart = "heart";
				} else {
					wishLists.forEach(wishList => {
						if (wishList._id !== _id) {
							wishClass.heart = "heart";
						} else {
							wishClass.red = "red-heart";
						}
					});
				}
			}
		}

		return (
			<div className='card' id='my-card'>
				<div
					id='wish'
					className={wishClass.red ? wishClass.red : wishClass.heart}
					onClick={this.onWishclick.bind(this, _id)}
				>
					<i className='fa fa-heart' />
				</div>
				<Link to={`/products/${_id}`} className='product__link'>
					<img
						className='card-img-top img-fluid'
						src={`/${productImage}`}
						alt='Card img'
					/>
				</Link>
				<div className='card-body'>
					<p
						className=''
						style={{
							fontSize: "15px",
							color: "#333",
							fontWeight: "500"
						}}
					>
						{category}
					</p>
					<p
						className='lead'
						style={{
							marginTop: "-20px",
							fontSize: "22px"
						}}
					>
						{title}
					</p>
					<div className='card-price__ratings'>
						<div className='card__price'>
							<p>${price}</p>
						</div>
						<div className='card__ratings'>
							3.24 <i className='fa fa-star' />
						</div>

						<div className='addToCardButton'>
							<button
								onClick={() => {
									this.props.addProductToCart({ ...this.props.product });
								}}
								id='btn-invisible'
								className='rate-product-button'
							>
								{" "}
								ADD TO CART
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProp = state => {
	return {
		user: state.auth,
		wishList: state.wishList
	};
};

export default connect(mapStateToProp, {
	addWishListAction,
	getWishListsAction,
	deleteWishListAction,
	addProductToCart
})(withRouter(Product));
