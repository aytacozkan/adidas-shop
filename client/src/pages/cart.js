import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, AddProducts } from '../containers';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
    return (
        <Query query={GET_CART_ITEMS}>
            {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <p>ERROR: {error.message}</p>;
                return (
                    <Fragment>
                        <Header>Cart</Header>
                        {!data.cartItems || !data.cartItems.length ? (
                            <p data-testid="empty-message">No items in your cart</p>
                        ) : (
                                <Fragment>
                                    {data.cartItems.map(productId => (
                                        <CartItem key={productId} productId={productId} />
                                    ))}
                                    <AddProducts cartItems={data.cartItems} />
                                </Fragment>
                            )}
                    </Fragment>
                );
            }}
        </Query>
    );
}