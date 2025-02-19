import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
const maxWidth = Math.min(width * 0.9, 400);

const Home = () => {
	const [count, setCount] = useState(0);
	const [display, setDisplay] = useState('0');
	const [expression, setExpression] = useState('');
	const [newNumber, setNewNumber] = useState(true);

	const handleNumber = (num) => {
		if (newNumber) {
			setDisplay(num);
			setExpression(prev => prev === '' ? num : prev + num);
			setNewNumber(false);
		} else {
			setDisplay(prev => prev + num);
			setExpression(prev => prev + num);
		}
	};

	const handleOperation = (op) => {
		setExpression(prev => prev + ' ' + op + ' ');
		setNewNumber(true);
	};

	const calculate = () => {
		try {
			let calcExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
			const result = eval(calcExp);
			setDisplay(result.toString());
			setExpression(result.toString());
			setNewNumber(true);
		} catch (error) {
			setDisplay('Error');
			setExpression('');
			setNewNumber(true);
		}
	};

	const clear = () => {
		setDisplay('0');
		setExpression('');
		setNewNumber(true);
	};

	return (
		<ScrollView 
			style={styles.mainContainer}
			contentContainerStyle={styles.scrollContent}
		>
			<View style={styles.content}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Counter</Text>
					<Text style={styles.counterText}>Count: {count}</Text>
					<View style={styles.buttonContainer}>
						<TouchableOpacity 
							style={[styles.button, styles.decrementButton]}
							onPress={() => setCount(prev => prev - 1)}
						>
							<Text style={styles.buttonText}>Decrement</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={[styles.button, styles.incrementButton]}
							onPress={() => setCount(prev => prev + 1)}
						>
							<Text style={styles.buttonText}>Increment</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Calculator</Text>
					<View style={styles.calculator}>
						<View style={styles.displayContainer}>
							<Text style={styles.expression}>{expression || '0'}</Text>
							<Text style={styles.display}>{display}</Text>
						</View>
						<View style={styles.buttonGrid}>
							{[['7', '8', '9', '÷'], 
							  ['4', '5', '6', '×'],
							  ['1', '2', '3', '-'],
							  ['AC', '0', '=', '+']].map((row, i) => (
								<View key={i} style={styles.row}>
									{row.map((btn) => (
										<TouchableOpacity
											key={btn}
											style={[
												styles.calcButton,
												['÷', '×', '-', '+'].includes(btn) && styles.operatorButton,
												btn === 'AC' && styles.clearButton,
												btn === '=' && styles.equalsButton
											]}
											onPress={() => {
												if (btn === 'AC') clear();
												else if (btn === '=') calculate();
												else if (['÷', '×', '-', '+'].includes(btn)) handleOperation(btn);
												else handleNumber(btn);
											}}
										>
											<Text style={[
												styles.calcButtonText,
												['÷', '×', '-', '+', 'AC', '='].includes(btn) && styles.operatorText
											]}>{btn}</Text>
										</TouchableOpacity>
									))}
								</View>
							))}
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#1C1C1E',
	},
	scrollContent: {
		flexGrow: 1,
		minHeight: '100%'
	},
	content: {
		padding: 16,
		alignItems: 'center',
		width: '100%'
	},
	section: {
		width: maxWidth,
		marginBottom: 20,
		backgroundColor: '#2C2C2E',
		borderRadius: 15,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
		color: '#8E8E93'
	},
	counterText: {
		fontSize: 48,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		color: 'white'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 20
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 8,
		minWidth: 120,
		alignItems: 'center'
	},
	decrementButton: {
		backgroundColor: '#FF3B30'
	},
	incrementButton: {
		backgroundColor: '#34C759'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600'
	},
	calculator: {
		width: '100%'
	},
	displayContainer: {
		backgroundColor: '#1C1C1E',
		borderRadius: 10,
		marginBottom: 15,
		padding: 15
	},
	expression: {
		fontSize: 20,
		textAlign: 'right',
		color: '#8E8E93',
		marginBottom: 5,
		minHeight: 30
	},
	display: {
		fontSize: 36,
		textAlign: 'right',
		fontWeight: '600',
		color: 'white'
	},
	buttonGrid: {
		gap: 10
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10
	},
	calcButton: {
		flex: 1,
		aspectRatio: 1,
		backgroundColor: '#3A3A3C',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		minHeight: 60
	},
	operatorButton: {
		backgroundColor: '#007AFF'
	},
	clearButton: {
		backgroundColor: '#FF3B30'
	},
	equalsButton: {
		backgroundColor: '#34C759'
	},
	calcButtonText: {
		fontSize: 24,
		fontWeight: '600',
		color: 'white'
	},
	operatorText: {
		color: 'white'
	}
});

export default Home;