## DilTerm

![visitors](https://visitor-badge.glitch.me/badge?page_id=dilterm.visitor-badge)

<div align="center">

![Electron Boilerplate Demo](https://raw.githubusercontent.com/Shihara-Dilshan/DilBash/master/view.gif)

</div>

## Install

- **If you have installation or compilation issues with this project, please see [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone https://github.com/Shihara-Dilshan/DilTerm
```

## !!!!IMPORTANT!!!!

This project uses a package that deprecated due to security issues. It is not available in yarn package manager. After cloning the repo, Remove the following dependency fromthe package.json file dependencies.

```bash
"child_process": "^1.0.2"
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

After installing the dependencies copy and paste the child_process folder inside the IMPORTANT FILE to node modules folder.

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Maintainers

- [Shihara-Dilshan](https://github.com/Shihara-Dilshan)

## License

MIT © DilTerm 2020
