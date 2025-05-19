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
export const Empty = {
  args: {
    label: 'Label',
    variant: 'empty',
  },
};

// Estado Padrão - Check
export const Checked = {
  args: {
    label: 'Label',
    variant: 'check',
    checked: true,
  },
};

// Estado Padrão - Traço
export const Dashed = {
  args: {
    label: 'Label',
    variant: 'dash',
    checked: true,
  },
};
