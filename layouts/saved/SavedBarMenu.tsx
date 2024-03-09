import {
	Menu,
	MenuTrigger,
	MenuOptions,
	MenuOption,
} from "react-native-popup-menu"
import settings from "../../app/settings"
import IconBtn from "../../components/common/IconBtn"
import { useAppTheme } from "../../components/ThemeManager"
import { useSettings } from "../../services/appSettings/components/settingsProvider"

export default function SavedBarMenu() {
	const { settings, update } = useSettings()
	const theme = useAppTheme()

	return (
		<Menu
			// ref={menu}
			name="saved-works-options"
		>
			<MenuTrigger
				customStyles={{
					TriggerTouchableComponent: IconBtn,
					triggerTouchable: {
						name: "dots-vertical",
						size: 32,
						iconStyle: { color: theme.header.font },
					},
				}}
			></MenuTrigger>
			<MenuOptions>
				<MenuOption
					text={
						settings.saved.filters.order == "latestAdded"
							? "Sorting by latest added"
							: "Sorting by oldest added"
					}
					onSelect={() => {
						update({
							saved: {
								filters: {
									order:
										settings.saved.filters.order ==
										"latestAdded"
											? "oldestAdded"
											: "latestAdded",
								},
							},
						})
					}}
				/>
			</MenuOptions>
		</Menu>
	)
}
