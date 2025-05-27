<p align="center">
  <img alt="Sebrae" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sebrae.svg/2560px-Sebrae.svg.png" width="200" />
</p>

<h1 align="center">
  Sebrae Design System - React Native
</h1>

<p align="center">
  Design System em React Native para o projeto Sebrae Na Palma da Mão
</p>

## 📋 Sobre o Projeto

Este é o repositório do Design System em React Native desenvolvido para o projeto Sebrae Na Palma da Mão. O objetivo é fornecer uma biblioteca de componentes reutilizáveis que seguem os padrões visuais e de interação do Sebrae, garantindo consistência e eficiência no desenvolvimento do aplicativo principal.

## 🎨 Componentes Disponíveis

Atualmente, o Design System conta com os seguintes componentes:

- **Accordeon**: Componente expansível para exibição de conteúdo organizado
- **Button**: Botões primários seguindo o padrão visual do Sebrae
- **Checkbox**: Componente de seleção múltipla
- **FilterTag**: Tags para filtros e categorização
- **Input**: Campos de entrada de texto padronizados

## 🚀 Como Usar

1. **Instalação das dependências:**

```bash
yarn
```

2. **Executando o Storybook:**

Para iOS:
```bash
yarn storybook:ios
```

Para Android:
```bash
yarn storybook:android
```

## 📚 Storybook

Cada componente possui sua própria história no Storybook, permitindo visualizar e testar diferentes estados e propriedades. As histórias estão localizadas junto aos componentes com o padrão de nomenclatura `*.stories.jsx`.

## 🔗 Integração com o Projeto Principal

Este Design System é um artefato do projeto principal [Sebrae Na Palma da Mão], um aplicativo móvel que funciona como uma agência do Sebrae na palma da mão. O aplicativo principal inclui diversas funcionalidades como:

- Integração com redes sociais
- Recursos de geolocalização e mapas
- Funcionalidades de câmera e scanner QR Code
- Recursos de compartilhamento e calendário
- Suporte a chat e preview de links
- E muito mais

## 🤝 Contribuição

Antes de adicionar novos componentes ou fazer modificações:

1. Verifique se o componente segue os padrões visuais do Sebrae
2. Adicione a documentação apropriada no Storybook
3. Teste o componente em diferentes dispositivos
4. Certifique-se de que as alterações não quebram a compatibilidade com o projeto principal

## 📝 Licença

Este projeto está sob a licença MIT.
