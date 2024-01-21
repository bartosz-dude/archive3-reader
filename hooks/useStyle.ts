import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function useStyle<T>(stylesheet: StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<StyleSheet.NamedStyles<T>>, deps?: React.DependencyList) {
	const style = useMemo(() => StyleSheet.create<typeof stylesheet>(stylesheet), [ deps ])
	return style
}
