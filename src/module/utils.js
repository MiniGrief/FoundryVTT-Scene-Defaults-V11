/**
 * The name of the module
 * Importance of this comment: 0
 */
export const modName = "scene-defaults"

// Returns true if this scene is a copy of an existing one
// I.e. is a duplicate or an import
export function isCopy(data) {
    return !data.type;
}