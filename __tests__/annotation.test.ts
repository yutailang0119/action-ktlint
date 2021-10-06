import {Annotation} from '../src/annotation'

test('test Annotation.constructor with warning', () => {
  const annotation = new Annotation(
    'warning',
    'Needless blank line(s)',
    'Foo.kt',
    22,
    1
  )
  expect(annotation.severityLevel).toEqual('warning')
  expect(annotation.message).toEqual('Needless blank line(s)')
  expect(annotation.properties).toEqual({
    file: 'Foo.kt',
    startLine: 22,
    startColumn: 1
  })
})

test('test Annotation.constructor with error', () => {
  const annotation = new Annotation('error', 'Unused import', 'Foo.kt', 3, 1)
  expect(annotation.severityLevel).toEqual('error')
  expect(annotation.message).toEqual('Unused import')
  expect(annotation.properties).toEqual({
    file: 'Foo.kt',
    startLine: 3,
    startColumn: 1
  })
})

test('test Annotation.constructor with other', () => {
  const annotation = new Annotation('', '', 'Bar.kt', 0, 0)
  expect(annotation.severityLevel).toEqual('warning')
})
