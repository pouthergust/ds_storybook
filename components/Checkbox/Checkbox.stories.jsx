import Checkbox from '.';

const meta = {
  title: 'Atom/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f4f4f4'
        }
      ]
    }
  },
  argTypes: {
    label: {
      description: 'Texto do checkbox',
      control: 'text',
    },
    checked: {
      description: 'Estado de seleção',
      control: 'boolean',
    },
    disabled: {
      description: 'Estado desabilitado',
      control: 'boolean',
    },
    variant: {
      description: 'Variante do ícone',
      control: 'select',
      options: ['empty', 'check', 'dash'],
    },
    onChange: {
      description: 'Função chamada ao alterar estado',
      action: 'changed',
    },
  },
};

export default meta;

// Estado Padrão - Vazio
export const DefaultEmpty = {
  args: {
    label: 'Label',
    variant: 'empty',
  },
};

// Estado Padrão - Check
export const DefaultCheck = {
  args: {
    label: 'Label',
    variant: 'check',
    checked: true,
  },
};

// Estado Padrão - Traço
export const DefaultDash = {
  args: {
    label: 'Label',
    variant: 'dash',
    checked: true,
  },
};

// Estado Hover - Vazio
export const HoverEmpty = {
  args: {
    ...DefaultEmpty.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Estado Hover - Check
export const HoverCheck = {
  args: {
    ...DefaultCheck.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Estado Hover - Traço
export const HoverDash = {
  args: {
    ...DefaultDash.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Estado Focus - Vazio
export const FocusEmpty = {
  args: {
    ...DefaultEmpty.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
};

// Estado Focus - Check
export const FocusCheck = {
  args: {
    ...DefaultCheck.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
};

// Estado Focus - Traço
export const FocusDash = {
  args: {
    ...DefaultDash.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
};

// Estado Desabilitado - Vazio
export const DisabledEmpty = {
  args: {
    ...DefaultEmpty.args,
    disabled: true,
  },
};

// Estado Desabilitado - Check
export const DisabledCheck = {
  args: {
    ...DefaultCheck.args,
    disabled: true,
  },
};

// Estado Desabilitado - Traço
export const DisabledDash = {
  args: {
    ...DefaultDash.args,
    disabled: true,
  },
};