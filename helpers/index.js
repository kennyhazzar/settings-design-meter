const getCallbackData = index => {
    if (index == 1) {
        return "Hot"
    }
    if (index == 2) {
        return "Warm"
    }
    if (index == 3) {
        return "Unclear"
    }
    if (index == 4) {
        return "Cold"
    }
}

module.exports = { getCallbackData }