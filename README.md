<a href="https://github.com/yutailang0119/action-ktlint/actions"><img alt="action-ktlint status" src="https://github.com/yutailang0119/action-ktlint/workflows/build-test/badge.svg"></a>

# GitHub Action for ktlint

This Action generates annotations from [ktlint](https://ktlint.github.io) Report XML.

## Usage

An example workflow(.github/workflows/ktlint.yml) to executing ktlint follows:

```yml
name: ktlint

on:
  pull_request:
    paths:
      - .github/workflows/ktlint.yml
      - 'src/**/*.kt'
      - '**.kts'

jobs:
  ktlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1
      - run: |
          curl -sSLO https://github.com/pinterest/ktlint/releases/download/1.2.1/ktlint && chmod a+x ktlint && sudo mv ktlint /usr/local/bin/
      - name: run ktlint
        run: |
          ktlint --reporter=checkstyle,output=build/ktlint-report.xml
        continue-on-error: true
      - uses: yutailang0119/action-ktlint@v4
        with:
          report-path: build/*.xml # Support glob patterns by https://www.npmjs.com/package/@actions/glob
          ignore-warnings: true # Ignore Lint Warnings
        continue-on-error: false # If annotations contain error of severity, action-ktlint exit 1.
```

## Author

[Yutaro Muta](https://github.com/yutailang0119)

## References

- Generated from [actions/typescript-action](https://github.com/actions/typescript-action) as template.

## License

action-ktlint is available under the MIT license. See [the LICENSE file](./LICENSE) for more info.
