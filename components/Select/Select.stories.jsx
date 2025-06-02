import Select from ".";

const meta = {
  title: "Atom/Select",
  component: Select,
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
          value: "#4F7CFE"
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
    variant: {
      description: "Variante do componente",
      control: "select",
      options: ["default", "inverse"],
    },
  },
};

export default meta;

// Dados de exemplo para as opções
const defaultOptions = [
  "Opção 1",
  "Opção 2", 
  "Opção 3",
  "Opção 4",
  "Opção 5"
];

const complexOptions = [
  { label: "Opção 1", value: "option1" },
  { label: "Opção 2", value: "option2" },
  { label: "Opção 3", value: "option3" },
  { label: "Opção 4", value: "option4" },
  { label: "Opção 5", value: "option5" }
];

// ================ ESTADOS BÁSICOS ================

// Estado Padrão
export const Default = {
  args: {
    label: "Rótulo do campo",
    placeholder: "Selecione uma opção",
    options: defaultOptions,
    supportText: "Estado padrão do select, visível quando não há interação. Deve ser estilizado para ser reconhecível como clicável.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado padrão do select, usado quando o item está disponível mas sem interação no momento.",
      },
    },
  },
};

// Estado com Hover
export const Hover = {
  args: {
    ...Default.args,
    supportText: "Estado aplicado quando o select recebe o foco via teclado ou dispositivos assistivos. Deve incluir um destaque visual (como um contorno) para garantir acessibilidade.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado aplicado quando o select está sendo 'hovered' pelo mouse.",
      },
    },
  },
};

// Estado com Foco
export const Focus = {
  args: {
    ...Default.args,
    supportText: "Estado aplicado quando o select recebe o foco via teclado ou dispositivos assistivos. Deve incluir um destaque visual (como um contorno) para garantir acessibilidade.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado ativo por teclado ou navegação assistiva, com destaque visível para acessibilidade.",
      },
    },
  },
};

// Estado Selecionado
export const Selected = {
  args: {
    ...Default.args,
    value: "Opção 1",
    supportText: "Estado usado para indicar que o select já foi selecionado pelo usuário.",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado usado para indicar que o select já foi selecionado pelo usuário.",
      },
    },
  },
};

// Estado Desabilitado
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    supportText: "Estado usado para select desativados, onde não é possível interagir.",
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
    supportText: "Estado usado para select com erro, onde devem ser corrigidos",
  },
  parameters: {
    docs: {
      description: {
        story: "Estado de erro do select, usado para indicar problemas na seleção.",
      },
    },
  },
};

// ================ VARIAÇÕES ================

// Rótulo no topo
export const LabelTop = {
  args: {
    label: "Rótulo do campo",
    placeholder: "Selecione uma opção",
    options: defaultOptions,
    supportText: "Use quando for necessário espaço em branco entre componentes de entrada ou em momentos produtivos em que o espaço é escasso e componentes menores são necessários.",
  },
  parameters: {
    docs: {
      description: {
        story: "Variação com rótulo posicionado no topo, útil para economizar espaço horizontal.",
      },
    },
  },
};

// Rótulo interno
export const LabelInternal = {
  args: {
    placeholder: "Rótulo do campo",
    options: defaultOptions,
    supportText: "Use em espaços contidos ou anexado a componentes complexos, como uma barra de ferramentas.",
  },
  parameters: {
    docs: {
      description: {
        story: "Variação com rótulo interno (como placeholder), útil para espaços compactos.",
      },
    },
  },
};

// ================ VARIAÇÃO INVERSE ================

// Inverse - Estado Padrão
export const Inverse = {
  args: {
    label: "Rótulo do campo",
    placeholder: "Selecione uma opção",
    options: defaultOptions,
    variant: "inverse",
    supportText: "A variação Inverse é utilizada em fundos azuis ou escuros, garantindo contraste e legibilidade.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Variação Inverse utilizada em fundos azuis ou escuros, garantindo contraste e legibilidade.",
      },
    },
  },
};

// Inverse - Estado com Hover
export const InverseHover = {
  args: {
    ...Inverse.args,
    supportText: "Estado hover da variação Inverse em fundos escuros.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Estado hover da variação Inverse em fundos escuros.",
      },
    },
  },
};

// Inverse - Estado com Foco
export const InverseFocus = {
  args: {
    ...Inverse.args,
    supportText: "Estado focado da variação Inverse com destaque em branco.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Estado focado da variação Inverse com destaque visível em branco.",
      },
    },
  },
};

// Inverse - Estado Selecionado
export const InverseSelected = {
  args: {
    ...Inverse.args,
    value: "Opção 1",
    supportText: "Estado selecionado da variação Inverse.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Estado selecionado da variação Inverse em fundos escuros.",
      },
    },
  },
};

// Inverse - Estado de Erro
export const InverseError = {
  args: {
    ...Inverse.args,
    error: true,
    supportText: "Estado de erro da variação Inverse.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Estado de erro da variação Inverse em fundos escuros.",
      },
    },
  },
};

// Inverse - Estado Desabilitado
export const InverseDisabled = {
  args: {
    ...Inverse.args,
    disabled: true,
    supportText: "Estado desabilitado da variação Inverse.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Estado desabilitado da variação Inverse em fundos escuros.",
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
    supportText: "Essa variação do componente pode ser usada quando se tem a necessidade de identificar grupos.",
  },
  parameters: {
    docs: {
      description: {
        story: "Variação do componente com separadores entre as opções, útil para identificar grupos de itens.",
      },
    },
  },
};

// Com Separador - Inverse
export const InverseWithSeparator = {
  args: {
    ...Inverse.args,
    withSeparator: true,
    supportText: "Variação Inverse com separadores entre as opções.",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Variação Inverse com separadores entre as opções para identificar grupos.",
      },
    },
  },
};

// ================ EXEMPLOS PRÁTICOS ================

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
        story: "Exemplo de select usando objetos complexos com propriedades label e value.",
      },
    },
  },
};

// Select com Muitas Opções
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
        story: "Exemplo de select com muitas opções para demonstrar o comportamento de scroll na lista.",
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
        story: "Use os controles acima para testar diferentes configurações: estados (error, success, disabled), withSeparator, variant e diferentes tipos de opções.",
      },
    },
  },
};