import {parseXml} from '../src/parser'
import {Annotation} from '../src/Annotation'

test('test parse', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <checkstyle version="8.0">
    <file name="Foo.kt">
      <error line="3" column="1" severity="error" message="Unused import" source="no-unused-imports"/>
      <error line="22" column="1" severity="error" message="Needless blank line(s)" source="no-consecutive-blank-lines"/>
    </file>
    <file name="Bar.kts">
      <error line="11" column="1" severity="error" message="Needless blank line(s)" source="no-consecutive-blank-lines"/>
    </file>
  </checkstyle>`

  const annotation1 = new Annotation('error', 'Foo.kt', 3, 1, 'Unused import')
  const annotation2 = new Annotation(
    'error',
    'Foo.kt',
    22,
    1,
    'Needless blank line(s)'
  )
  const annotation3 = new Annotation(
    'error',
    'Bar.kts',
    11,
    1,
    'Needless blank line(s)'
  )

  expect(parseXml(xml)).resolves.toEqual([
    annotation1,
    annotation2,
    annotation3
  ])
})
