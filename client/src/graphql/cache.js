import {InMemoryCache} from '@apollo/client';
import {GET_FAVORITE_PRODUCTS_COUNT} from './requests';

function convertDolarValueToCustomCurrency(dollar) {
	// return dollar * 10; //<- If the actual currency is 10 times of USD
	return dollar;
}

export const cache = new InMemoryCache({
	typePolicies: {
		Product: {
			fields: {
				favorite: {
					read(favorite = false) {
						return favorite;
					},
				},
				price(price) {
					return `${convertDolarValueToCustomCurrency(price)} USD`;
				},
			},
		},
		Query: {
			fields: {
				product(_, {args, toReference}) {
					return toReference({
						__typename: 'Product',
						id: args.id,
					});
				},
			},
		},
	},
});

cache.writeQuery({
	query: GET_FAVORITE_PRODUCTS_COUNT,
	data: {
		favoriteProductsCount: 0,
	},
});
