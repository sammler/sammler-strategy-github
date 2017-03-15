## strategy-github

> Sammler strategy to collect GitHub content.

[![CircleCI](https://circleci.com/gh/sammler/strategy-github/tree/master.svg?style=svg)](https://circleci.com/gh/sammler/strategy-github/tree/master)
[![XO code style](https://img.shields.io/badge/code_style-XO--space-5ed9c7.svg)](https://github.com/sindresorhus/xo-space)

**Note: Work in progress, nothing to show, yet**

## Install

First install yarn:

```
npm install -g yarn
```

**Production environment**

```sh
$ yarn run dc-up
```

**Development environment**

```sh
$ yarn run dc-dev-up
```

The development environment uses different ports, to not conflict with the sammler development environment:

* ## Rest service:
* RabbitMQ:
  - 18080 - Management UI
  - 15672 - Communication port
* MongoDB:
  - 27117
* jobs-service
  - 4003

## Author

**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License

MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 15, 2017._