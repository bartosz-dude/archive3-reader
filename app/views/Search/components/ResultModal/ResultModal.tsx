import {
	FlatList,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import useColorSheet from "../../../../hooks/useColorSheet"
import { useState } from "react"
import type { State } from "../../../../types/utility"
import ActionButton from "../../../../components/ui/ActionButton/ActionButton"
import type { RenderableResults } from "../../../../services/search/SearchService"
import Renderer from "../../../../services/renderer/Renderer"
import RendererProvider from "../../../../services/renderer/RendererProvider"

interface ResultModalProps {
	visibleState: State<boolean>
	result: RenderableResults["results"][0]
}

export default function ResultModal({
	visibleState,
	result,
}: ResultModalProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)
	const [visible, setVisible] = visibleState

	const { title, author, series, summary } = result

	return (
		<>
			<Modal
				animationType="fade"
				transparent
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<Pressable onPress={() => setVisible(false)}>
					<View style={colorSheet.overlay}>
						{/* <View style={colorSheet.modal}> */}
						<Pressable
							style={colorSheet.modal}
							// onPress={(e) => e.stopPropagation()}
						>
							<View style={colorSheet.handle}></View>
							<View style={colorSheet.actions}>
								<ActionButton label="Chapters" />
								<ActionButton label="Original" />
								<ActionButton label="Read" />
								<ActionButton label="Save" />
							</View>
							{/* <View style={colorSheet.content}> */}
							<ScrollView
								style={{ height: 40 }}
								showsVerticalScrollIndicator
								// scrollEnabled
								contentContainerStyle={colorSheet.container}
							>
								<View style={colorSheet.header}>
									<Text>{title}</Text>
									{/* <View> */}
									<FlatList
										scrollEnabled={false}
										data={author}
										horizontal
										ItemSeparatorComponent={() => (
											<Text>, </Text>
										)}
										renderItem={({ item }) => (
											<>
												<Text style={colorSheet.text}>
													{item.pseudo}
												</Text>
											</>
										)}
									/>
									{/* </View> */}
									<View style={colorSheet.headerSeries}>
										{series.map((item) => (
											<>
												<View
													style={colorSheet.series}
													key={item.id}
												>
													<Text
														style={colorSheet.text}
													>
														{item.title}
													</Text>
													<Text
														style={colorSheet.text}
													>
														Part {item.part}
													</Text>
												</View>
											</>
										))}
									</View>
								</View>
								<View style={colorSheet.summary}>
									<RendererProvider
										style={{
											text: {
												textAlign: "justify",
											},
										}}
									>
										<Renderer html={summary} />
									</RendererProvider>
								</View>
							</ScrollView>
							{/* </View> */}
						</Pressable>
						{/* </View> */}
					</View>
				</Pressable>
			</Modal>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	overlay: {
		height: "100%",
		display: "flex",
		justifyContent: "flex-end",
		backgroundColor: "#0003",
	},
	modal: {
		height: "50%",
	},
	content: {
		height: "40%",
	},
	container: {
		borderWidth: 1,
		borderColor: "pink",
		// height: "20%",
		// paddingHorizontal: 15,
		// paddingTop: 10,
		// display: "flex",
	},
	handle: {
		minHeight: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		// position: "absolute",
		width: "101%",
		left: "-0.5%",
		bottom: -1,
	},
	actions: {
		zIndex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingBottom: 15,
		paddingTop: 10,
	},
	text: {},
	header: {
		display: "flex",
		alignItems: "center",
		gap: 10,
	},
	headerSeries: {
		paddingTop: 10,
		display: "flex",
		gap: 10,
	},
	series: {
		display: "flex",
		gap: 10,
		flexDirection: "row",
	},
	summary: {
		height: "100%",
		// marginVertical: 15,
		// textAlign: "justify",
	},
})

const lightStyle = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	handle: {
		backgroundColor: "white",
		borderColor: "black",
	},
	actions: {
		backgroundColor: "white",
		borderColor: "black",
	},
	text: {
		color: "#000",
	},
})

const darkStyle = StyleSheet.create({})
