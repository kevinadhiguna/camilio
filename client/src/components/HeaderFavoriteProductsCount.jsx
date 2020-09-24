import React from 'react';
import {useQuery} from '@apollo/client';
import {View, Text, StyleSheet} from 'react-native';

import {GET_FAVORITE_PRODUCTS_COUNT} from '../graphql/requests';

export function HeaderFavoriteProductsCount() {
	const {data} = useQuery(GET_FAVORITE_PRODUCTS_COUNT);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{data.favoriteProductsCount}</Text>
		</View>
	);
}

const SIZE = 32;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
		backgroundColor: 'orange',
		height: SIZE,
		width: SIZE,
		borderRadius: SIZE / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
