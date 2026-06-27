import { Redirect } from 'expo-router';

export default function Root() {
  // Change to '/(tabs)/home' if already logged in
  return <Redirect href="/(tabs)/home" />;
}