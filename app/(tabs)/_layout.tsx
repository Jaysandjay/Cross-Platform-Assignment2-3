import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#00FFF6",
				tabBarInactiveTintColor: "#6B7280",
				tabBarStyle: {
					backgroundColor: "#0B1120",
					borderTopColor: "#22D3EE",
					borderTopWidth: 1,
				},
				headerShown: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="magnifyingglass"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: "Favorites",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="heart.fill"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="help"
				options={{
					title: "How to",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="questionmark.circle"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
