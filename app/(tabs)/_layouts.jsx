import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, Slot } from 'expo-router';

const RootLayout = () => {
	return (
		<View style={styles.container}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#007AFF',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					headerTitle: 'Counter & Calculator App',
				}}
			>
				<Slot />
			</Stack>
		</View>
	);
};

export default RootLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1C1C1E',
	}
});