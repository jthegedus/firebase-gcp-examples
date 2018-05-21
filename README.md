<h1 align="center">blog code</h1>

<p align="center">
Code samples used in my <a href="https://medium.com/@jthegedus/table-of-contents-ec337953b39b">blog posts</a> covering FaaS with <a href="https://firebase.google.com/docs/functions/">Cloud Functions</a>, BaaS with <a href="https://firebase.google.com/">Firebase</a>, <a href="http://graphql.org/">GraphQL</a> with <a href="https://github.com/apollographql">Apollo</a> & Server-side Rendered (SSR) React with <a href="https://github.com/zeit/next.js/">Next.js</a>.
</p>

<!-- badges -->

<p align="center">
  <a href="https://github.com/prettier/prettier"><img alt="styled with Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" /></a>
</p>

<!-- toc -->

<p align="center">
    <em>
      :notebook: <a href="#posts-n-code">posts & code</a> :computer:
      · :spiral_notepad: <a href="#notes">notes on examples</a>
      · :wrench: <a href="#code-compat">code compatibility</a>
      · :family_man_woman_girl_boy: <a href="#contribs">contributions</a>
      · :computer: <a href="#dev-tools">developer tools used</a>
      · :man_technologist: <a href="#find-me">find me</a>
    </em>
</p>

<h2 id="posts-n-code">:notebook: posts & code :computer:</h2>

| Technical Blog posts                                                                                                                                                      | Repo/Folder                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| [Exploring Cloud Functions for Firebase](https://medium.com/@jthegedus/exploring-cloud-functions-for-firebase-cdf62297349e)                                               | --                                                                                                    |
| [Babel & preset-env](https://medium.com/@jthegedus/babel-preset-env-cbc0bbf06b8f)                                                                                         | --                                                                                                    |
| [ES6+ in Cloud Functions for Firebase #2](https://medium.com/@jthegedus/es6-in-cloud-functions-for-firebase-2-415d15205468)                                               | [firebase-functions-babel-example](/firebase-functions-es6-babel)                                     |
| [Express.js on Cloud Functions for Firebase](https://medium.com/@jthegedus/express-js-on-cloud-functions-for-firebase-86ed26f9144c)                                       | [firebase-functions-express](/firebase-functions-express)                                             |
| [GraphQL Server on Cloud Functions for Firebase](https://medium.com/@jthegedus/graphql-server-on-cloud-functions-for-firebase-ae97441399c0)                               | [firebase-functions-graphql-example](https://github.com/jthegedus/firebase-functions-graphql-example) |
| [Next.js on Cloud Functions for Firebase with Firebase Hosting](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2) | [firebase-functions-next-example](https://github.com/jthegedus/firebase-functions-next-example)       |
| [Firebase Package Names and Bundle Sizes](https://medium.com/@jthegedus/firebase-package-names-and-bundle-sizes-ec10cede63f1)                                             | [firebase-namespaced-packages](/firebase-namespaced-packages)                                         |
| [TBA]()                                                                                                                                                                   | [gcp-functions-graphql](/gcp-functions-graphql)                                                       |
| []()                                                                                                                                                                      | [](/)                                                                                                 |

| Other Blog posts                                                                                      |
| :---------------------------------------------------------------------------------------------------- |
| [GitHub & Medium with Embedly](https://medium.com/@jthegedus/github-medium-with-embedly-30d9115af585) |

<h2 id="notes">:spiral_notepad: notes on examples</h2>

These examples use [Yarn](https://yarnpkg.com/) for all npm scripts, so either install Yarn or replace all uses of `yarn` in the scripts with `npm run`.

Firebase CLI is recommended to be used with the **Node.js 8.9.x LTS**, however the Cloud Function runtime is still using **Node.js 6.11.5**. As such, this repo enforces Node.js 8.9.4 (in the .tool-versions file used by [asdf](https://github.com/asdf-vm/asdf)) and it's recommended to compile your code to 6.11.5 (or not use any Node features from > Node.js v7.

I use [CodeSandbox](https://codesandbox.io) not as a development playground, but as a means to keep my code snippets in Medium in sync with this repo. Do not expect these examples to execute in CodeSandbox.

<h2 id="code-compat">:wrench: code compatibility</h2>

Everything was tested on Ubuntu 17.10. If you wish for Windows native support please [submit an issue](https://github.com/jthegedus/blog-code/issues/new) so we can work on a Windows branch. Please report any macOS errors as I do not have access to a device to test. [My development environment can be found here](https://github.com/jthegedus/dotfiles).

<h2 id="contribs">:family_man_woman_girl_boy: contributions</h2>

Contributions are welcome!

**Please note:** I do intend to write a blog post about each of the examples here. I have a lot of examples in various stages of progress that I will release when I have the blog post written. If you wish to contribute to examples prior to a post being written I will of course credit all contributions to each particular example :smile:

If you have a request please open an issue so we can discuss how & why it should be implemented.

<h2 id="dev-tools">:computer: developer tools used</h2>

* [asdf](https://github.com/asdf-vm/asdf) - extendable version manager with support for Node, Ruby, Go, Python and more!
* [Yarn](https://github.com/yarnpkg/yarn) - NodeJS package manager
* [PrettierJS](https://prettier.io/) - Opinionated Code Formatter.

<h2 id="find-me">:man_technologist: find me...</h2>

<ul>
  <li><a href="https://medium.com/@jthegedus">:writing_hand: medium</a></li>
  <li><a href="https://twitter.com/">:bird: twitter</a></li>
  <li><a href="https://github.com/jthegedus">:octocat: github</a></li>
</ul>
