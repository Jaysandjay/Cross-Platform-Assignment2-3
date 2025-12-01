import React from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ProgressModalProps {
	visible: boolean;
	currentCount: number;
	goalCount?: number;
	onClose: () => void;
}

export default function ProgressModal({ visible, currentCount, goalCount = 5, onClose }: ProgressModalProps) {
	// REF THE ANIMS
	const fadeAnim = React.useRef(new Animated.Value(0)).current;
	const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

	// CALCS FOR NEXT 5 MILESTONE
	const isMilestone = currentCount > 0 && currentCount % goalCount === 0;
	const remaining = isMilestone ? goalCount : goalCount - (currentCount % goalCount);

	React.useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 250,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					friction: 5,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			fadeAnim.setValue(0);
			scaleAnim.setValue(0.8);
		}
	}, [visible]);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="none"
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.overlay}
				activeOpacity={1}
				onPress={onClose}
			>
				<Animated.View style={[styles.modalCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
					{isMilestone ? (
						<>
							<Text style={styles.celebrationEmoji}>🎉</Text>
							<Text style={styles.title}>x5 Milestone Reached!</Text>
							<Text style={styles.message}>You've saved {currentCount} recipes!</Text>
							<Text style={styles.subMessage}>Keep going to reach {currentCount + goalCount}!</Text>
						</>
					) : (
						<>
							<Text style={styles.progressEmoji}>✨</Text>
							<Text style={styles.title}>Recipe Added!</Text>
							<Text style={styles.subMessage}>{remaining} more to reach your next goal!</Text>
						</>
					)}

					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<Text style={styles.closeButtonText}>Got it!</Text>
					</TouchableOpacity>
				</Animated.View>
			</TouchableOpacity>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(5, 8, 22, 0.85)",
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	modalCard: {
		backgroundColor: "#0B1120",
		borderRadius: 24,
		padding: 32,
		width: "100%",
		maxWidth: 350,
		borderWidth: 2,
		borderColor: "#FF00FF",
		alignItems: "center",
	},
	celebrationEmoji: { fontSize: 64, marginBottom: 16 },
	progressEmoji: { fontSize: 56, marginBottom: 16 },
	title: {
		fontSize: 24,
		fontWeight: "800",
		color: "#00FFF6",
		marginBottom: 12,
		textAlign: "center",
	},
	message: {
		fontSize: 20,
		fontWeight: "700",
		color: "#FF00FF",
		marginBottom: 8,
		textAlign: "center",
	},
	subMessage: {
		fontSize: 16,
		color: "#A5B4FC",
		marginBottom: 24,
		textAlign: "center",
	},
	closeButton: {
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 999,
		backgroundColor: "#00FFF6",
	},
	closeButtonText: {
		color: "#050816",
		fontWeight: "700",
		fontSize: 16,
	},
});
