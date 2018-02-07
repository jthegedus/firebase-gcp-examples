# Blog Examples

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Example code for my Cloud Function, Firebase, Next.js & React [blog posts](https://medium.com/@jthegedus/table-of-contents-ec337953b39b).

## Tech covered in the blog

* [Firebase](https://firebase.google.com/) - "Serverless" Backend as a Service for web and mobile.
* [Next.js](https://github.com/zeit/next.js/) - Server-Side Rendered React framework with bundle splitting and offline caching.
* [GraphQL](http://graphql.org/) - A query language for you API.

## Nota bene

These examples use [Yarn](https://yarnpkg.com/) for all npm scripts, so either install Yarn or replace all uses of `yarn` in the scripts with `npm run`.

Firebase CLI is recommended to be used with the **Node.js 8.9.x LTS**, however the Cloud Function runtime is still using **Node.js 6.11.5**. As such, this repo enforces Node.js 8.9.4 (in the .tool-versions file used by [asdf](https://github.com/asdf-vm/asdf)) and it's recommended to compile your code to 6.11.5 (or not use any Node features from > Node.js v7.

I use [CodeSandbox](https://codesandbox.io) not as a development playground, but as a means to keep my code snippets in Medium in sync with this repo. Do not expect these examples to execute in CodeSandbox.

## TOC

| Technical Blog posts                                                                                                                                                      | Repo/Folder                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| [Exploring Cloud Functions for Firebase](https://medium.com/@jthegedus/exploring-cloud-functions-for-firebase-cdf62297349e)                                               | --                                                                                                    |
| [Babel & preset-env](https://medium.com/@jthegedus/babel-preset-env-cbc0bbf06b8f)                                                                                         | --                                                                                                    |
| [ES6+ in Cloud Functions for Firebase #2](https://medium.com/@jthegedus/es6-in-cloud-functions-for-firebase-2-415d15205468)                                               | [firebase-functions-babel-example](/firebase-functions-es6-babel)                                     |
| [Express.js on Cloud Functions for Firebase](https://medium.com/@jthegedus/express-js-on-cloud-functions-for-firebase-86ed26f9144c)                                       | [firebase-functions-express-example](/firebase-functions-express)                                     |
| [GraphQL Server on Cloud Functions for Firebase](https://medium.com/@jthegedus/graphql-server-on-cloud-functions-for-firebase-ae97441399c0)                               | [firebase-functions-graphql-example](https://github.com/jthegedus/firebase-functions-graphql-example) |
| [Next.js on Cloud Functions for Firebase with Firebase Hosting](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2) | [firebase-functions-next-example](https://github.com/jthegedus/firebase-functions-next-example)       |
| [Firebase Package Names and Bundle Sizes](https://medium.com/@jthegedus/firebase-package-names-and-bundle-sizes-ec10cede63f1)                                             | [firebase-namespaced-packages](/firebase-namespaced-packages)                                         |

| Other Blog posts                                                                                      |
| :---------------------------------------------------------------------------------------------------- |
| [GitHub & Medium with Embedly](https://medium.com/@jthegedus/github-medium-with-embedly-30d9115af585) |

## Other tech I use

* [asdf](https://github.com/asdf-vm/asdf) - extendable version manager with support for Node, Ruby, Go, Python and more!
* [Yarn](https://github.com/yarnpkg/yarn) - NodeJS package manager
* [PrettierJS](https://prettier.io/) - Opinionated Code Formatter.

## Find me at

[Medium](https://medium.com/@jthegedus) [Twitter](https://twitter.com/) [GitHub](https://github.com/jthegedus)

## A note on Code Compatibility

Everything was tested on Ubuntu 17.10. If you wish for Windows native support please [submit an issue](https://github.com/jthegedus/blog-examples/issues/new) so we can work on a Windows branch. Please report any macOS errors as I do not have access to a device to test. [My development environment can be found here](https://github.com/jthegedus/dotfiles).
