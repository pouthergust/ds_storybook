import Dropdown from ".";

const meta = {
  title: "Atom/Dropdown",
  component: Dropdown,
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
      description: "Rótulo do campo de seleção",
      control: "text",
    },
    placeholder: {
      description: "Texto de placeholder",
      control: "text",
    },
    value: {
      description: "Valor selecionado",
      control: "object",
    },
    options: {
      description: "Lista de opções disponíveis",
      control: "object",
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
    withSeparator: {
      description: "Adiciona separadores entre as opções",
      control: "boolean",
    },
  },
};

export default meta;

// Dados de exemplo para as opções
const defaultOptions = [
  "List Item",
  "List Item 2",
  "List Item 5",
  "List Item 3",
  "List Item 4",
  "List Item 6"
];

const complexOptions = [
  { label: "List Item", value: "item1" },
  { label: "List Item 2", value: "item2" },
  { label: "List Item 5", value: "item5" },
  { label: "List Item 3", value: "item3" },
  { label: "List Item 4", value: "item4" },
  { label: "List Item 6", value: "item6" }
];

const companyOptions = [
  "Setrae",
  "Setraetec",
  "Setrae delas",
  "Setrae na sua empresa",
  "Setrae Conecta"
];

// ================ ESTADOS BÁSICOS ================

// Estado Padrão
export const Default = {
  args: {
    label: "Label",
    placeholder: "Selecione uma opção",
    options: defaultOptions,
    supportText: "Estado padrão, usado quando o item está disponível, mas sem interação no momento.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado padrão do dropdown, usado quando o item está disponível mas sem interação no momento.",
      },
    },
  },
};

// Estado com Foco
export const Focus = {
  args: {
    ...Default.args,
    supportText: "Estado ativo por teclado ou navegação assistiva, com destaque visível para acessibilidade.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado ativo por teclado ou navegação assistiva, com destaque visível para acessibilidade.",
      },
    },
  },
};

// Estado Desabilitado
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    supportText: "O item está indisponível para interação, com aparência apagada para indicar inatividade.",
  },
  parameters: {
    docs: {
      description: {
        story: "O item está indisponível para interação, com aparência apagada para indicar inatividade.",
      },
    },
  },
};

// Estado de Erro
export const Error = {
  args: {
    ...Default.args,
    error: true,
    supportText: "Mensagem de erro para orientar o usuário",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de erro do dropdown, usado para indicar problemas na seleção.",
      },
    },
  },
};

// Estado de Sucesso
export const Success = {
  args: {
    ...Default.args,
    success: true,
    value: "List Item",
    supportText: "Seleção realizada com sucesso",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de sucesso do dropdown, usado para confirmar uma seleção válida.",
      },
    },
  },
};

// ================ VARIAÇÕES COM SEPARADOR ================

// Com Separador
export const WithSeparator = {
  args: {
    ...Default.args,
    withSeparator: true,
    supportText: "Essa variação do componente, pode ser usada quando se tem a necessidade de identificar grupos.",
  },
  parameters: {
    docs: {
      description: {
        story: "Variação do componente com separadores entre as opções, útil para identificar grupos de itens.",
      },
    },
  },
};

// Com Separador - Estado de Sucesso
export const WithSeparatorSuccess = {
  args: {
    ...WithSeparator.args,
    success: true,
    value: "List Item 2",
    supportText: "Opção selecionada com sucesso no dropdown com separadores",
  },
};

// ================ EXEMPLOS PRÁTICOS ================

// Exemplo de Seleção de Empresa
export const CompanySelection = {
  args: {
    label: "Empresa",
    placeholder: "Selecione sua empresa",
    options: companyOptions,
    supportText: "Escolha a empresa na qual você trabalha",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo prático de uso do dropdown para seleção de empresa, baseado na imagem mobile fornecida.",
      },
    },
  },
};

// Exemplo de Seleção de Empresa - Preenchido
export const CompanySelectionFilled = {
  args: {
    ...CompanySelection.args,
    value: "Setrae",
    success: true,
    supportText: "Empresa selecionada corretamente",
  },
};

// ================ OPÇÕES COMPLEXAS ================

// Dropdown com Objetos Complexos
export const ComplexOptions = {
  args: {
    label: "Opções Complexas",
    placeholder: "Selecione uma opção",
    options: complexOptions,
    supportText: "Exemplo usando objetos com label e value",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo de dropdown usando objetos complexos com propriedades label e value.",
      },
    },
  },
};

// Dropdown com Muitas Opções
export const ManyOptions = {
  args: {
    label: "Muitas Opções",
    placeholder: "Selecione uma opção",
    options: [
      ...defaultOptions,
      ...defaultOptions.map(item => `${item} (Grupo 2)`),
      ...defaultOptions.map(item => `${item} (Grupo 3)`)
    ],
    withSeparator: true,
    supportText: "Exemplo com muitas opções para testar o scroll",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo de dropdown com muitas opções para demonstrar o comportamento de scroll no modal mobile.",
      },
    },
  },
};

// ================ EXEMPLO DE FORMULÁRIO ================

// Exemplo de Formulário Completo
export const FormExample = {
  args: {
    label: "Exemplo em Formulário",
    placeholder: "Selecione uma opção",
    options: defaultOptions,
    supportText: "Use os controles do Storybook para testar diferentes estados e configurações",
  },
  parameters: {
    docs: {
      description: {
        story: "Use os controles acima para testar diferentes configurações: estados (error, success, disabled), withSeparator, e diferentes tipos de opções.",
      },
    },
  },
};