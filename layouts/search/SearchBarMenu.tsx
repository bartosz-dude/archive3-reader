import { router, usePathname } from "expo-router"
import { ToastAndroid } from "react-native"
import {
	Menu,
	MenuTrigger,
	MenuOptions,
	MenuOption,
} from "react-native-popup-menu"
import IconBtn from "../../components/common/btns/IconBtn"
import worksQuery from "../../services/ao3/api/worksQuery"
import saveQuery, { SaveQueryErrors } from "../../services/saver/api/saveQuery"

export default function SearchBarMenu(props: { ao3Query: string }) {
	const pathname = usePathname()

	return (
		<Menu name="search-options">
			<MenuTrigger
				customStyles={{
					TriggerTouchableComponent: IconBtn,
					triggerTouchable: {
						name: "dots-vertical",
						size: 32,
						iconStyle: { color: "white" },
					},
				}}
			></MenuTrigger>
			<MenuOptions
				customStyles={
					{
						// optionsContainer: {
						// 	marginTop: 32
						// }
					}
				}
			>
				{pathname == "/search" && (
					<MenuOption
						text="Save search"
						onSelect={() => {
							saveQuery(worksQuery(props.ao3Query))
								.then(() => {
									ToastAndroid.show(
										"Search saved",
										ToastAndroid.SHORT
									)
								})
								.catch((err) => {
									if (
										err.message ==
										SaveQueryErrors.alreadyExists
									)
										return
									ToastAndroid.show(
										"Already saved",
										ToastAndroid.SHORT
									)
								})
						}}
					/>
				)}
				<MenuOption
					text="Saved searches"
					onSelect={() => router.navigate("/search/savedSearches")}
				/>
				{/* <MenuOption
							text="History"
							disabled
						/> */}
				<MenuOption
					text="Settings"
					onSelect={() => {
						router.navigate("/settings")
						// update({ savedSearchesAsDefault: !settings.savedSearchesAsDefault })
					}}
				/>
			</MenuOptions>
		</Menu>
	)
}
