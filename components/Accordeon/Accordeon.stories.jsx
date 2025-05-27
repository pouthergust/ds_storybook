import { Text, View } from "react-native";
import Accordeon from ".";

const meta = {
    title: "Atom/Accordeon",
    component: Accordeon,
    render: (props) => (
        <Accordeon 
            {...props}
            content={
                <View style={{ flexDirection: 'column' }}>
                    <Text>{props.content}</Text>
                    <Accordeon 
                        nested
                        title="Item 01"
                        content={
                            <Text>
                                Sed nulla quam, fermentum tincidunt lacus at, viverra vehicula eros. Etiam neque libero, vulputate sed consectetur nec, imperdiet sed turpis.
                            </Text>
                        }
                    />
                </View>
            }
        />
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
                }
            ]
        }
    },
    argTypes: {
        title: {
            description: "Título do acordeon",
            control: "text",
        },
        content: {
            description: "Conteúdo que será exibido quando o acordeon estiver aberto",
            control: "text",
        },
        initiallyOpen: {
            description: "Define se o acordeon deve iniciar aberto",
            control: "boolean",
        },
    },
};

export default meta;

// Estado Padrão
export const Default = {
    args: {
        title: "Item",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus malesuada magna vitae dapibus. Etiam bibendum, tortor a mattis mattis, arcu quam imperdiet quam, at aliquam ex risus nec turpis. Suspendisse semper turpis ante, quis iaculis metus varius sed. Donec iaculis tortor nec auctor egestas.",
        initiallyOpen: false,
    },
};

// Estado Hover
// export const Hover = {
//     args: {
//         ...Padrao.args,
//     },
//     parameters: {
//         pseudo: { hover: true },
//     },
// };

// Estado com Foco
// export const Foco = {
//     args: {
//         ...Padrao.args,
//     },
//     parameters: {
//         pseudo: { focus: true },
//     },
// };

// Estado Ativo (Aberto)
export const Open = {
    args: {
        ...Default.args,
        initiallyOpen: true,
    },
};