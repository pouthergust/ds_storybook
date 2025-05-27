import { View } from "react-native";
import Button from "./index.jsx";

const meta = {
  title: "Atom/Button",
  component: Button,
  render: (props) => (
    <View style={{ marginHorizontal: 'auto', marginTop: 12 }}>
      <Button {...props} />
    </View>
  ),
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f4f4f4"
        },
        {
          name: "dark",
          value: "#081032"
        }
      ]
    }
  },
  argTypes: {
    label: {
      description: "Texto do botão",
      control: "text",
    },
    size: {
      description: "Tamanho do botão",
      control: "select",
      options: ["large", "medium", "small"],
    },
    variant: {
      description: "Variante do botão",
      control: "select",
      options: ["filled", "outlined", "transparent"],
    },
    inverseStyle: {
      description: "Estilo de cores inverso",
      control: "boolean",
    },
    iconPosition: {
      description: "Posição do ícone",
      control: "select",
      options: ["left", "right", "both"],
    },
    iconName: {
      description: "Nome do ícone",
      control: "text",
    },
    disabled: {
      description: "Estado desabilitado",
      control: "boolean",
    },
  },
};

export default meta;

// Estado Primario
export const Primary = {
  args: {
    label: "Label",
    size: "large",
    variant: "filled",
    iconName: "home-outline",
    iconPosition: "both",
  },
};

// Estado Secundario
export const Secundary = {
  args: {
    label: "Label",
    size: "large",
    variant: "outlined",
    iconName: "home-outline",
    iconPosition: "both",
  },
};

// Estado Terceario
export const Tertiary = {
  args: {
    label: "Label",
    size: "large",
    variant: "transparent",
    iconName: "home-outline",
    iconPosition: "both",
  },
};
