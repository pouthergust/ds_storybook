/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  framework: "@storybook/react-native",
  stories: ["../components/**/*.stories.?(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
  docs: {
    defaultName: "Documentation",
  }
};
