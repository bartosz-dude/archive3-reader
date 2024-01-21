import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { DevSettings, ScrollView, Text, View, useColorScheme } from 'react-native';
import { fetchWork } from "../services/ao3/scraper/Work";
import { MenuProvider } from "react-native-popup-menu";
import setupDB from "../services/saver/api/setupDB";
import getDB from "../services/database/getDB";
import * as Dev from "expo-dev-client"



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

  useEffect(() => {
    setupDB()
  })

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // const [ work, setWork ] = useState<string[]>([])
  // const m = useMemo(async () => fetchWork("48613378", "122623150").then((v) => setWork(v)), [])
  // fetchWork("48613378", "122623150").then((v) => setWork(v))

  return (
    <ThemeProvider value={/*colorScheme === 'dark' ? DarkTheme : */DefaultTheme}>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack> */}
      {/* <View>
        <Text>abc</Text>
      </View>
      <ScrollView style={{
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 30,

      }}>
        {work.map((v, i) => <Text key={i} style={{ marginVertical: 10, textAlign: "justify" }}>{v}</Text>)}
      </ScrollView> */}
      <MenuProvider>
        <Slot />
      </MenuProvider>
    </ThemeProvider>
  );
}
