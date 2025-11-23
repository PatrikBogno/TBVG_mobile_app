import i18next from "../translations/i18n.js";

export const DropdownHelpers = {
  language: async (item) => {
    await i18next.changeLanguage(item.value);
  },

  style: async (item) => {
    console.log("Style changed to:", item.value);
    // TODO: apply theme, call context, etc.
  },

  sound: async (item) => {
    console.log("Sound mode:", item.value);
    // TODO: change sound settings, play preview, etc.
  },
};
