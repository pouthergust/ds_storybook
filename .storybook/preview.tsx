import React from 'react';
import { Preview } from "@storybook/react";
import { View } from "react-native";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

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
