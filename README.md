# Compound Interest Calculator - Estrutura do Projeto

Este projeto utiliza Next.js (app directory) e foi organizado para manter o código limpo, modular e fácil de manter.

## Estrutura de Pastas

- **app/**  
  Contém a aplicação Next.js com páginas e componentes principais.

- **app/calculator/**  
  Contém o componente principal do calculador de juros compostos e o formulário.

- **app/calculator/state/**  
  Contém o reducer e os tipos relacionados ao estado do calculador.

- **lib/**  
  Funções utilitárias e lógicas de negócio, como o cálculo dos juros compostos.

- **hooks/**  
  Custom hooks reutilizáveis, como o hook para formatar moeda e o hook que gerencia o estado do calculador com useReducer.

- **components/**  
  Componentes reutilizáveis e genéricos (botões, inputs, tabelas etc).

## Principais Tecnologias e Padrões

- **React + Next.js 13 (App Router)**  
- **useReducer** para gerenciamento complexo de estado  
- **TypeScript** para tipagem forte  
- **Tailwind CSS** para estilos utilitários  
- **Custom Hooks** para encapsular lógica reutilizável  
- **Separation of Concerns**: lógica de negócio separada do componente visual

## Como rodar

```bash
npm install
npm run dev
