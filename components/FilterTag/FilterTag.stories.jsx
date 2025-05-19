import { View } from 'react-native';
import FilterTag from '.';

const meta = {
  title: 'Atom/FilterTag',
  component: FilterTag,
  render: (props) => (
    <View style={{ marginHorizontal: 'auto', marginTop: 12 }}>
      <FilterTag {...props} />
    </View>
  ),
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
      control: 'text',
      description: 'Texto exibido na tag',
    },
    onRemove: {
      action: 'removed',
      description: 'Função chamada ao clicar no botão de remover',
    },
  },
};

export default meta;

// Estado Padrão
export const Default = {
  args: {
    label: 'Empreendedorismo',
  },
};


// Estado Focus
export const Focus = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
};