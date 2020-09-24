import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {useMutation} from '@apollo/client';

import {FavoriteIcon} from './FavoriteIcon';
import {Card} from './Card';

import {BASE_URL} from '../config';
import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';

export function Product({product, onPress}) {
	const [addOrRemoveProductFromFavorite] = useMutation(
		ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
		{
			variables: {
				productId: product.id,
			},
		},
	);

	return (
		<Card key={product.id} style={styles.card} onPress={onPress}>
			<Image
				source={{uri: BASE_URL + product.thumb.url}}
				style={styles.thumb}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{product.name}</Text>
				<Text style={styles.price}>{product.price}</Text>
				<Text style={styles.description}>{product.description}</Text>
			</View>
			<FavoriteIcon
				favorite={product.favorite}
				onPress={async () => {
					await addOrRemoveProductFromFavorite();
				}}
			/>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginVertical: 20,
	},
	thumb: {
		height: 260,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	infoContainer: {
		padding: 16,
	},
	name: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		fontWeight: '400',
		color: '#787878',
	},
});
