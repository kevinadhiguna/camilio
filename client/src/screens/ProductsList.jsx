import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {useQuery} from '@apollo/client';
import {GET_ALL_PRODUCTS} from '../graphql/requests';

import {Product} from '../components/Product';
import {Loading} from '../components/Loading';
import {Error} from '../components/Error';

export function ProductsList({navigation}) {
	const {data, loading, error} = useQuery(GET_ALL_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
	});

	if (loading) return <Loading hasBackground />;
	if (error) return <Error error={error} />;

	function renderProduct({item: product}) {
		return (
			<Product
				product={product}
				onPress={() => {
					navigation.navigate('ProductDetails', {
						productId: product.id,
					});
				}}
			/>
		);
	}

	return (
		<FlatList
			style={styles.productsList}
			contentContainerStyle={styles.productsListContainer}
			data={data.products}
			renderItem={renderProduct}
		/>
	);
}

const styles = StyleSheet.create({
	productsList: {
		backgroundColor: '#fafafa',
	},
	productsListContainer: {
		backgroundColor: '#fafafa',
		paddingVertical: 8,
		marginHorizontal: 8,
	},
});
