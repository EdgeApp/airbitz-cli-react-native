# react-native-airbitz-cli

This is a mobile App which allows you to use the Airbitz CLI on your phone. It supports the same commands as the [`airbitz-cli`](https://github.com/Airbitz/airbitz-cli) command-line tool.

## Installing

Just use `npm install` to get the depenencies. The `yarn` tool does not work, due to bugs in the way it handles git dependencies.

    npm install
    react-native run-android
    # or...
    react-native run-ios

You must have the package [`react-native-cli`](https://www.npmjs.com/package/react-native-cli) installed globally on your system.

If you are developing on the core, the normal `npm link` technique does not work with React Native. Use the `copy-core.sh` script provided in this repo instead.
