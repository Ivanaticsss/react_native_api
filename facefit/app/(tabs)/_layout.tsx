import { Tabs } from 'expo-router';
import { Dimensions } from 'react-native';

const { width: SW } = Dimensions.get('window');
const scale = (s: number) => Math.round((SW / 390) * s);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D1526',
          borderTopColor: '#1E3A5F',
          borderTopWidth: 1,
          height: scale(60),
          paddingBottom: scale(8),
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: {
          fontSize: scale(11),
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} /> }}
      />
      <Tabs.Screen
        name="scan"
        options={{ title: 'Scan', tabBarIcon: ({ color }) => <TabIcon icon="🤳" color={color} /> }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{ title: 'Results', tabBarIcon: ({ color }) => <TabIcon icon="✂️" color={color} /> }}
      />
      <Tabs.Screen
        name="salons"
        options={{ title: 'Salons', tabBarIcon: ({ color }) => <TabIcon icon="💈" color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} /> }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  const { Text } = require('react-native');
  const scale2 = (s: number) => Math.round((SW / 390) * s);
  return <Text style={{ fontSize: scale2(22), opacity: color === '#3B82F6' ? 1 : 0.5 }}>{icon}</Text>;
}