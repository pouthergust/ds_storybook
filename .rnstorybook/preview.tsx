import React from 'react';
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { Preview } from "@storybook/react";
import { View } from "react-native";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [withBackgrounds],
  decorators: [
    (Story, { parameters }) => (
      <View
        style={{
          flex: 1,
          backgroundColor:
            parameters.noBackground === true ? undefined : "#fff",
          padding: 8,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default preview;
