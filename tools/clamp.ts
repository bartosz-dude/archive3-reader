type Clamp = {
	min?: {
		to: number,
		else: number
	},
	max?: {
		to: number,
		else: number
	}
}

export default function clamp(val: number, clamp: Clamp) {
	if (clamp.min && val < clamp.min?.to)
		return clamp.min.else

	if (clamp.max && val > clamp.max?.to)
		return clamp.max.else

	return val
}