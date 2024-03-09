import { Text, View } from "react-native"
import useStyle from "../../../../../hooks/useStyle"
import Slider from "@react-native-community/slider"
import { useEffect, useReducer, useState } from "react"
import { useAppTheme } from "../../../../../components/ThemeManager"
import IconBtn from "../../../../../components/common/IconBtn"

type ValueReducerAction =
	| {
			type: "increase"
			by: number
	  }
	| {
			type: "decrease"
			by: number
	  }
	| {
			type: "direct"
			value: number
	  }

export default function FormatSlider(props: {
	min: number
	max: number
	buttonStep: number
	sliderStep: number
	valueState: number
	valueDisplay: number
	onChange: (value: number) => void
}) {
	const theme = useAppTheme()
	const style = useStyle({
		slider: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 15,
			gap: 10,
		},
		valueDisplay: {
			width: 20,
			display: "flex",
			// justifyContent: "flex-end",
			alignItems: "flex-end",
		},
	})

	const [value, setValue] = useReducer(
		(state: number, action: ValueReducerAction) => {
			switch (action.type) {
				case "increase": {
					if (state == props.min) {
						state = action.by
						break
					}

					if (state + action.by >= props.max) {
						state = props.max
						break
					}

					state = state + action.by
					break
				}
				case "decrease": {
					if (state == props.max) {
						state = action.by
						break
					}

					if (state - action.by <= props.min) {
						state = props.min
						break
					}

					state = state - action.by
					break
				}
				case "direct": {
					if (action.value >= props.max) {
						state = props.max
						break
					}
					if (action.value <= props.min) {
						state = props.min
						break
					}

					state = action.value
					break
				}
			}

			return state
		},
		props.valueState
	)

	// useEffect(() => {
	// 	setValue(props.valueState)
	// }, [props.valueState])
	useEffect(() => {
		const updateTimeout = setTimeout(() => {
			props.onChange(value)
		}, 600)

		return () => {
			clearTimeout(updateTimeout)
		}
	}, [value])

	return (
		<View style={style.slider}>
			<IconBtn
				name="arrow-down"
				size={24}
				onPress={() => {
					setValue({
						type: "decrease",
						by: props.buttonStep,
					})
				}}
			/>
			<Slider
				style={{ flexGrow: 1 }}
				minimumValue={props.min}
				maximumValue={props.max}
				value={value}
				step={props.sliderStep}
				thumbTintColor={theme.tabBar.selected}
				minimumTrackTintColor={theme.tabBar.selected}
				maximumTrackTintColor={theme.tabBar.unselected}
				onValueChange={(e) => {
					setValue({
						type: "direct",
						value: e,
					})
					// props.onChange(e)
				}}
				// onSlidingComplete={(e) => {
				// 	props.onChange(e)
				// }}
			/>
			<IconBtn
				name="arrow-up"
				size={24}
				onPress={() => {
					setValue({
						type: "increase",
						by: props.buttonStep,
					})
				}}
			/>
			<View style={style.valueDisplay}>
				<Text>{value}</Text>
			</View>
		</View>
	)
}
