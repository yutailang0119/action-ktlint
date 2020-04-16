// import {workflowMessage} from '../src/command'
// import {Annotation} from '../src/annotation'

// test('test warning workflow-message', () => {
//   const path = 'foo/bar/piyo'
//   const line = 11
//   const column = 22
//   const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   const annotation = new Annotation('warning', path, line, column, description)
//   expect(workflowMessage(annotation)).toEqual(
//     `::warning file=${[path]},line=${line},col=${column}::${description}`
//   )
// })

// test('test error workflow-message', () => {
//   const path = 'foo/bar/piyo'
//   const line = 33
//   const column = 44
//   const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   const annotation = new Annotation('error', path, line, column, description)
//   expect(workflowMessage(annotation)).toEqual(
//     `::error file=${[path]},line=${line},col=${column}::${description}`
//   )
// })
