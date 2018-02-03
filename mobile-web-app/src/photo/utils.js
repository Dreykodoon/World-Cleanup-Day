let i = 0;

/**
 * Generates an ID for a photo. The algorithm increments a counter by 1 and returns the
 * string representation of that number.
 *
 * @returns {string} the new ID.
 */
export function generatePhotoId() {
    return i++ + '';
}
