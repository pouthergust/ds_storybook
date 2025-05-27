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
    mask: {
      description: "Ativa o uso de máscara no campo",
      control: "boolean",
    },
    maskType: {
      description: "Tipo de máscara a ser aplicada",
      control: {
        type: "select",
        options: ["cpf", "cep", "phone", "date", "currency"],
      },
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

// ================ MÁSCARAS DE ENTRADA ================

// Máscara CPF
export const MaskCPF = {
  args: {
    label: "CPF",
    placeholder: "000.000.000-00",
    supportText: "Digite apenas números, a formatação será aplicada automaticamente",
    mask: true,
    maskType: "cpf",
  },
  parameters: {
    docs: {
      description: {
        story: "Campo com máscara para CPF. Formato: 000.000.000-00. Aceita apenas números e formata automaticamente.",
      },
    },
  },
};

// Máscara CPF Preenchido
export const MaskCPFFilled = {
  args: {
    ...MaskCPF.args,
    value: "123.456.789-00",
    success: true,
    supportText: "CPF válido inserido corretamente",
  },
};

// Máscara CPF com Erro
export const MaskCPFError = {
  args: {
    ...MaskCPF.args,
    error: true,
    supportText: "CPF inválido. Verifique os números inseridos",
  },
};

// Máscara CEP
export const MaskCEP = {
  args: {
    label: "CEP",
    placeholder: "00000-000",
    supportText: "Digite apenas números para o CEP",
    mask: true,
    maskType: "cep",
  },
  parameters: {
    docs: {
      description: {
        story: "Campo com máscara para CEP. Formato: 00000-000. Facilita a entrada correta dos números do CEP.",
      },
    },
  },
};

// Máscara CEP Preenchido
export const MaskCEPFilled = {
  args: {
    ...MaskCEP.args,
    value: "01234-567",
    success: true,
    supportText: "CEP inserido corretamente",
  },
};

// Máscara Telefone
export const MaskPhone = {
  args: {
    label: "Telefone",
    placeholder: "(00) 00000-0000",
    supportText: "Digite apenas números, incluindo DDD",
    mask: true,
    maskType: "phone",
  },
  parameters: {
    docs: {
      description: {
        story: "Campo com máscara para telefone. Formatos: (00) 0000-0000 ou (00) 00000-0000. Detecta automaticamente celular ou fixo.",
      },
    },
  },
};

// Máscara Telefone Preenchido
export const MaskPhoneFilled = {
  args: {
    ...MaskPhone.args,
    value: "(11) 99999-8888",
    success: true,
    supportText: "Número de telefone válido",
  },
};

// Máscara Data
export const MaskDate = {
  args: {
    label: "Data",
    placeholder: "DD/MM/AAAA",
    supportText: "Digite a data no formato DD/MM/AAAA",
    mask: true,
    maskType: "date",
  },
  parameters: {
    docs: {
      description: {
        story: "Campo com máscara para data. Formato: DD/MM/AAAA. Ajuda na digitação de datas no formato esperado.",
      },
    },
  },
};

// Máscara Data Preenchida
export const MaskDateFilled = {
  args: {
    ...MaskDate.args,
    value: "15/12/2023",
    success: true,
    supportText: "Data inserida corretamente",
  },
};

// Máscara Moeda
export const MaskCurrency = {
  args: {
    label: "Valor",
    placeholder: "R$ 0,00",
    supportText: "Digite o valor em reais",
    mask: true,
    maskType: "currency",
  },
  parameters: {
    docs: {
      description: {
        story: "Campo com máscara para valores monetários. Formato: R$ 0.000,00. Facilita a entrada de valores monetários com símbolos e separadores.",
      },
    },
  },
};

// Máscara Moeda Preenchida
export const MaskCurrencyFilled = {
  args: {
    ...MaskCurrency.args,
    value: "R$ 1.250,75",
    success: true,
    supportText: "Valor inserido corretamente",
  },
};

// ================ EXEMPLOS COMBINADOS ================

// Exemplo de Formulário Completo
export const FormExample = {
  args: {
    label: "Exemplo de Formulário",
    placeholder: "Este é um exemplo de como usar as máscaras",
    supportText: "Use os controles do Storybook para testar diferentes tipos de máscaras",
    mask: true,
    maskType: "cpf",
  },
  parameters: {
    docs: {
      description: {
        story: "Use os controles acima para testar diferentes tipos de máscaras: cpf, cep, phone, date, currency. Cada máscara tem sua formatação específica e teclado apropriado.",
      },
    },
  },
};