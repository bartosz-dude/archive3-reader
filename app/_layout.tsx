import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import { fetchWork } from "../services/ao3/scraper/Work";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ loaded, error ] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [ error ]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [ loaded ]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [ work, setWork ] = useState<string[]>([])
  const m = useMemo(async () => fetchWork("48613378", "122623150").then((v) => setWork(v)), [])
  // fetchWork("48613378", "122623150").then((v) => setWork(v))

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack> */}
      {/* <Text>{work}</Text> */}
      <ScrollView style={{
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 30,

      }}>
        {work.map((v, i) => <Text key={i} style={{ marginVertical: 10, textAlign: "justify" }}>{v}</Text>)}
      </ScrollView>
    </ThemeProvider>
  );
}
