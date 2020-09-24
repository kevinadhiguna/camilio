import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/client/testing';

import {ProductsList} from '../src/screens/ProductsList';

import {GET_ALL_PRODUCTS} from '../src/graphql/requests';
import {GraphQLError} from 'graphql';

async function wait(ms = 0) {
	await renderer.act(() => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	});
}

describe('ProductList', () => {
	it('Shows loading', () => {
		const component = renderer.create(
			<MockedProvider>
				<ProductList />
			</MockedProvider>,
		);

		expect(() => component.root.findByType('ActivityIndicator')).not.toThrow();
	});

	it('shows error', async () => {
		const mockedError = {
			request: {
				query: GET_ALL_PRODUCTS,
			},
			result: {
				errors: [
					new GraphQLError('Oops.. we can not find the prodcuts.. try later:)'),
				],
			},
		};

		const component = renderer.create(
			<MockedProvider mocks={[mockedError]} addTypename={false}>
				<ProductsList />
			</MockedProvider>,
		);

		await wait();

		expect(() => {
			component.root.findByProps({
				children:
					'GraphQL error: Oops.. We can not find the products..try later:)',
			});
		}).not.toThrow();
	});

	it('Shows products list', async () => {
		const mockedData = {
			request: {
				query: GET_ALL_PRODUCTS,
			},
			result: {
				data: {
					products: [
						{
							id: '5f699b0538a9bc332bf2195e',
							name: 'Nike Sport Shoes',
							price: 180,
							description:
								'A cool Nike shoes that can be put on when running and bycycling  🚴‍♂️.',
							thumb: {
								id: '5f6cd6d1b61f1d66166351d7',
								url: '/uploads/nike_Shoes_4d550123ce.png',
							},
						},
						{
							id: '5f699b3738a9bc332bf21960',
							name: 'Authentic T-Shirt',
							price: 149.86,
							description:
								'A comfortable T-Shirt with nice dark blue color 👕.',
							thumb: {
								id: '5f6cda75b61f1d66166351d9',
								url: '/uploads/T_shirt_4195401768.png',
							},
						},
						{
							id: '5f699b6d38a9bc332bf21962',
							name: 'BAPE Jacket',
							price: 200,
							description: 'A must-wear jacket wherever you go 🚀.',
							thumb: {
								id: '5f6cdaafb61f1d66166351da',
								url: '/uploads/BAPE_jacket_056e74b0e1.png',
							},
						},
					],
				},
			},
		};

		const component = renderer.create(
			<MockedProvider mocks={[mockedData]} addTypename={false}>
				<ProductsList />
			</MockedProvider>,
		);

		await wait();

		console.log(component.toJSON());

		expect(() => {
			component.root.findByProps({
				children: 'Nike II',
			});
		}).not.toThrow();

		expect(() => {
			component.root.findByProps({
				children: 'Nike Prcs',
			});
		}).not.toThrow();
	});
});
