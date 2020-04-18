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
      - 'src/**/*.k'
      - '**.kts'

jobs:
  ktlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: brew install ktlint
      - name: run ktlint
        run: |
          ktlint --reporter=checkstyle,output=build/ktlint-report-in-checkstyle-format.xml
      - uses: yutailang0119/action-ktlint@v1.0.0
        with:
          xml_path: build/ktlint-report-in-checkstyle-format.xml
```

## Author

[Yutaro Muta](https://github.com/yutailang0119)

## References

- Generated from [actions/typescript-action](https://github.com/actions/typescript-action) as template.

## License

action-ktlint is available under the MIT license. See [the LICENSE file](./LICENSE) for more info.
