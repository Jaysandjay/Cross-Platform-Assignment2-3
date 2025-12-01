import React from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
	visible: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmModal({ visible, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }: ConfirmModalProps) {
	const fadeAnim = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		if (visible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		} else {
			fadeAnim.setValue(0);
		}
	}, [visible]);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onCancel}
		>
			<View style={styles.overlay}>
				<Animated.View style={[styles.modalCard, { opacity: fadeAnim }]}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>

					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={onCancel}
						>
							<Text style={styles.cancelButtonText}>{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.confirmButton}
							onPress={onConfirm}
						>
							<Text style={styles.confirmButtonText}>{confirmText}</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
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
		padding: 24,
		width: "100%",
		maxWidth: 400,
		borderWidth: 2,
		borderColor: "#22D3EE",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#00FFF6",
		marginBottom: 12,
		textAlign: "center",
	},
	message: {
		fontSize: 16,
		color: "#E5E7EB",
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 22,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: "#22D3EE",
		backgroundColor: "transparent",
		alignItems: "center",
	},
	cancelButtonText: { color: "#00FFF6", fontWeight: "600" },
	confirmButton: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 999,
		backgroundColor: "#FF00FF",
		alignItems: "center",
	},
	confirmButtonText: { color: "#050816", fontWeight: "700" },
});
