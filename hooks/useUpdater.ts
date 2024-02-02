import { useState } from "react";

export default function useUpdater(): [ boolean, () => void ] {
	const [ updater, setUpdater ] = useState(false)

	return [ updater, () => setUpdater(prev => !prev) ]
}