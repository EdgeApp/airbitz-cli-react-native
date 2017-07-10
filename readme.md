# react-native-airbitz-cli

This is a mobile App which allows you to use the Airbitz CLI on your phone. It supports the same commands as the [`airbitz-cli`](https://github.com/Airbitz/airbitz-cli) command-line tool.

## Installing

The current state of this repo (as of 2017-07-10) requires several repos synced alongside this one as the package.json references a local directory vs NPM or github

    git clone git@github.com:Airbitz/airbitz-cli-react-native.git
    git clone git@github.com:Airbitz/airbitz-core-react-native.git
    git clone git@github.com:Airbitz/airbitz-currency-ethereum.git
    git clone git@github.com:Airbitz/ethereumjs-wallet.git
    git clone git@github.com:Airbitz/airbitz-currency-shitcoin.git
    git clone git@github.com:Airbitz/react-native-fast-crypto.git
    git clone git@github.com:Airbitz/airbitz-cli.git
    git clone git@github.com:Airbitz/airbitz-core-js.git

    cd airbitz-cli-react-native
    yarn

    ./clean-abc

    yarn
    react-native run-android
    # or...
    react-native run-ios

You must have the package [`react-native-cli`](https://www.npmjs.com/package/react-native-cli) installed globally on your system.

If you are developing on the core, the normal `npm link` technique does not work with React Native. Use the `copy-core.sh` script provided in this repo instead.
