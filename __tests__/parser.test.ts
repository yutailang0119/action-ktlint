import path from 'path'
import url from 'url'
import {expect} from '@jest/globals'
import {Annotation} from '../src/annotation.js'
import {parseXmls, parseXml} from '../src/parser.js'

describe('parser.ts', () => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

  it('test parseXmls', () => {
    const file1 = path.join(__dirname, 'resource', 'ktlint-report.xml')
    const file2 = path.join(__dirname, 'resource', 'empty-report.xml')

    const annotation1 = new Annotation('error', 'Unused import', 'Foo.kt', 3, 1)
    const annotation2 = new Annotation(
      'warning',
      'Needless blank line(s)',
      'Foo.kt',
      22,
      1
    )
    const annotation3 = new Annotation(
      'warning',
      'Needless blank line(s)',
      'Bar.kts',
      45,
      1
    )

    expect(parseXmls([file1, file2], false)).resolves.toEqual([
      annotation1,
      annotation2,
      annotation3
    ])
  })

  it('test parseXmls and ignore warnings', () => {
    const file1 = path.join(__dirname, 'resource', 'ktlint-report.xml')
    const file2 = path.join(__dirname, 'resource', 'empty-report.xml')

    const annotation1 = new Annotation('error', 'Unused import', 'Foo.kt', 3, 1)

    expect(parseXmls([file1, file2], true)).resolves.toEqual([annotation1])
  })

  it('test parseXml with error', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <checkstyle version="8.0">
      <file name="Foo.kt">
        <error line="3" column="1" severity="error" message="Unused import" source="no-unused-imports"/>
        <error line="22" column="1" severity="warning" message="Needless blank line(s)" source="no-consecutive-blank-lines"/>
      </file>
      <file name="Bar.kts">
        <error line="11" column="1" severity="warning" message="Needless blank line(s)" source="no-consecutive-blank-lines"/>
      </file>
    </checkstyle>`

    const annotation1 = new Annotation('error', 'Unused import', 'Foo.kt', 3, 1)
    const annotation2 = new Annotation(
      'warning',
      'Needless blank line(s)',
      'Foo.kt',
      22,
      1
    )
    const annotation3 = new Annotation(
      'warning',
      'Needless blank line(s)',
      'Bar.kts',
      11,
      1
    )

    expect(parseXml(xml, false)).resolves.toEqual([
      annotation1,
      annotation2,
      annotation3
    ])
  })

  it('test parseXml without file', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <checkstyle version="8.0">
    </checkstyle>`

    expect(parseXml(xml, false)).resolves.toEqual([])
  })

  it('test parseXml without error', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <checkstyle version="8.0">
      <file name="Foo.kt">
      </file>
      <file name="Bar.kts">
      </file>
    </checkstyle>`

    expect(parseXml(xml, false)).resolves.toEqual([])
  })
})
