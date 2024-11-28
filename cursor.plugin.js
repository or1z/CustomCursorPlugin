/**
 * @name CustomCursorPlugin
 * @version 1.0.0
 * @author or1z
 * @authorId b5se
 * @description Changes the mouse cursor to a custom image that appears only when the plugin is active.
 * @source https://github.com/or1z/CustomCursorPlugin
 * @changelogDate 2024-11-27
 * @credits or1z for creating the custom cursor plugin
 * @invite https://discord.gg/swear
 * Changelog: Initial Release: Added the ability to change the cursor image when the plugin is active.
 */

'use strict';

/*@module @manifest */
const manifest = {
    "name": "CustomCursorPlugin",
    "version": "1.0.0",
    "author": "or1z",
    "authorId": "b5se",
    "description": "Changes the mouse cursor to a custom image that appears only when the plugin is active.",
    "source": "https://github.com/or1z/CustomCursorPlugin",
    "invite": "https://discord.gg/swear",  // Change this to your actual invite link
    "changelog": [{
        "title": "Cursor Visibility Control",
        "type": "added",
        "items": [
            "The cursor is now only visible when the plugin is active and goes back to default when the plugin is turned off."
        ]
    }],
    "changelogDate": "2024-11-27"
};
/*@end */

/* @module @api */
const { Webpack } = BdApi;
/*@end */

/* @module custom-cursor.js */

// User-customizable cursor images (change these URLs to update cursors)
let defaultCursorUrl = 'https://cdn.custom-cursor.com/128/assets/pointers/32/Cat_Paw_Cursor.png'; // Change default cursor image URL here

// Plugin Initialization
class CustomCursorPlugin {
    constructor() {
        this.pluginName = 'CustomCursorPlugin';
        this.isActive = false;  // Track if the plugin is active
    }

    start() {
        this.isActive = true;
        this.applyCustomCursor();
    }

    stop() {
        this.isActive = false;
        this.removeCustomCursor();
    }

    applyCustomCursor() {
        if (this.isActive) {
            // Apply the custom cursor globally (only when active)
            document.body.style.cursor = `url('${defaultCursorUrl}'), auto`;

            // Add a global style to apply the custom cursor on all clickable elements
            const style = document.createElement("style");
            style.id = "custom-cursor-style";
            style.textContent = `
                /* Apply the custom cursor to all elements on the page */
                * {
                    cursor: url('${defaultCursorUrl}'), auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    removeCustomCursor() {
        if (!this.isActive) {
            document.body.style.cursor = 'auto'; // Reset to default cursor

            // Remove the custom cursor style
            const style = document.getElementById('custom-cursor-style');
            if (style) {
                style.remove();
            }
        }
    }
}

// Plugin Entry Points
const plugin = new CustomCursorPlugin();

module.exports = plugin;
