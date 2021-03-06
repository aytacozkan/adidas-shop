import React from 'react';

import {
    renderAdidas,
    cleanup,
    waitForElement,
} from '../../test-utils';
import Profile, { GET_MY_WISHLIST } from '../profile';

const mockProduct = {
    __typename: 'Product',
    id: "5c5d273a404753b93ea1c71f",
    isBooked: true,
    name: "Manchester United Üçüncü Takım Forması",
    title: "Manchester United Üçüncü Takım Forması",
    imageUri: "https://www.adidas.com.tr/dis/dw/image/v2/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/dw39b0fb65/zoom/DP6022_000_plp_model.jpg?sw=230&sfrm=jpg",
    isInCart: false,
};

const mockMe = {
    __typename: 'User',
    id: 1,
    email: 'aytac@linux.com',
    wishlist: [mockProduct],
};

describe('Profile Page', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders profile page', async () => {
        const mocks = [
            {
                request: { query: GET_MY_WISHLIST },
                result: { data: { me: mockMe } },
            },
        ];

        const { getByText } = renderAdidas(<Profile />, { mocks });

        // if the profile renders, it will have the list of products in the wishlist
        await waitForElement(() => getByText(/Manchester United Üçüncü Takım Forması/i));
    });
});
