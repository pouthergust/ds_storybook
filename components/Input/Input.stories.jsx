import Input from ".";

const meta = {
  title: "Atom/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f4f4f4"
        }
      ]
    }
  },
  argTypes: {
    label: {
      description: "Rótulo do campo de entrada",
      control: "text",
    },
    placeholder: {
      description: "Texto de placeholder",
      control: "text",
    },
    value: {
      description: "Valor do campo",
      control: "text",
    },
    supportText: {
      description: "Texto de suporte abaixo do campo",
      control: "text",
    },
    error: {
      description: "Estado de erro",
      control: "boolean",
    },
    success: {
      description: "Estado de sucesso",
      control: "boolean",
    },
    disabled: {
      description: "Estado desabilitado",
      control: "boolean",
    },
  },
};

export default meta;

// Estado Padrão
export const Default = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    supportText: "Support Text",
  },
};

// Estado Hover
export const Hover = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Estado com Foco
export const Focus = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
};

// Estado Preenchido
export const Filled = {
  args: {
    ...Default.args,
    value: "Texto preenchido",
  },
};

// Estado de Erro
export const Error = {
  args: {
    ...Default.args,
    error: true,
    supportText: "Mensagem de erro",
  },
};

// Estado de Sucesso
export const Success = {
  args: {
    ...Default.args,
    success: true,
    supportText: "Mensagem de sucesso",
  },
};

// Estado Desabilitado
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};