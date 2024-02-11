export const watch_guide = (
	watchGuide: any,
	setWatchGuide: any
) => {
    if (watchGuide === true) {
        setWatchGuide(false)
    }

    else {
        setWatchGuide(true)
    }
}