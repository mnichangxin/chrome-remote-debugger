import BitField from '../models/BitField'

/**
 * helper method to emulate key event on page
 *
 * @param  {Number} keyCode key code to be simulated
 */
function triggerKeyboardEvent (
    keyCode, type = 'keydown', bubbles = true, cancelable = true,
    altKeyArg = false, ctrlKeyArg = false, metaKeyArg = false, shiftKeyArg = false
) {
    const eventObj = document.createEventObject
        ? document.createEventObject() : document.createEvent('Events')

    if (eventObj.initEvent) {
        eventObj.initEvent(type, bubbles, cancelable)
    }

    eventObj.keyCode = keyCode
    eventObj.which = keyCode
    eventObj.altKey = altKeyArg
    eventObj.shiftKey = ctrlKeyArg
    eventObj.ctrlKey = metaKeyArg
    eventObj.metaKey = shiftKeyArg

    document.body.dispatchEvent
        ? document.body.dispatchEvent(eventObj) : document.body.fireEvent('onkeydown', eventObj)
}

/**
 * Dispatches a key event to the page.
 *
 * @param  {String}   type            Type of the key event. Allowed values: keyDown, keyUp, rawKeyDown, char.
 * @param  {Integer}  modifiers       Bit field representing pressed modifier keys.
 *                                    (Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0))
 * @param  {String}   value           Text as generated by processing a virtual key code with a keyboard layout.
 */
export function dispatchKeyEvent ({ type, modifiers, value }) {
    const bitModifiers = new BitField(modifiers)
    const altKeyArg = bitModifiers.get(1)
    const ctrlKeyArg = bitModifiers.get(2)
    const metaKeyArg = bitModifiers.get(4)
    const shiftKeyArg = bitModifiers.get(8)

    const args = [type, 'keydown', true, true, altKeyArg, ctrlKeyArg, metaKeyArg, shiftKeyArg]

    /**
     * simplification for HbbTV supported devices
     */
    if (window.KeyEvent) {
        if (Array.isArray(value)) {
            value = value.join('')
        }

        const key = value.slice(0, 3).toUpperCase() === 'VK_' ? value.toUpperCase() : `VK_${value.toUpperCase()}`
        triggerKeyboardEvent(window.KeyEvent[key], type, ...args)
        return { success: true }
    }

    value.forEach((char) => triggerKeyboardEvent(char.charCodeAt(0), type, ...args))
    return { success: true }
}
