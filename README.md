# React Lite

This repository is a React Framework built for client side applications. It provides facility for creation of boilerplate setup and also provides various important utilities which help if faster application development.

## Ecosystem of this framework 🎉

- **Redux + Redux-Saga** for state management
- **Reselect** for optimizations
- **Dynamic reducer/saga** injection
- **Flow typed:** All components are FlowTyped and Flow Type checked.
- **Static Code Quality checks and formatting:** Javascript and CSS linting using Eslint, Stylelint and Prettier.
- **Component scaffolding:** Consistently generate components using Plop.
- **Documentation:** Generates code documentation with ESDocs.
- **Git Hooks:** Pre-commit, Pre-push and pre-publish using Husky.
- **Unit testing framework:** with Jest and Enzyme.
- **Babel 7** to transpiling javascript and releasing them as ESModules.

## Getting Started

Dependencies should be installed using the yarn
command line tools.

```sh
yarn install
yarn run flow:install
```

flow:install will search the [`libdef`](https://github.com/flow-typed/flow-typed/blob/master/README.md) repo and download all the libdefs that are relevant for our project and install them for us.

## Topics to refer

- [Development Tools](readme/DevelopmentTools.md)
- [Static Code Linters and Code Formatter](readme/StaticCodeLinters.md)
- [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)
- [Folder Structure](readme/FolderStructure.md)
- [Component Scaffolding](readme/Component.md)
- [Flow Type](readme/FlowType.md)
- [Husky](readme/Husky.md)
- [ES Docs](readme/ESDocs.md)
- [Running The Tests](readme/Test.md)
