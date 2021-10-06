import {AnnotationProperties} from '@actions/core'
import {AnnotationSeverityLevel} from './annotation-severity-level'

export class Annotation {
  severityLevel: AnnotationSeverityLevel
  message: string
  properties: AnnotationProperties

  constructor(
    severity: string,
    message: string,
    file: string,
    line: number,
    column: number
  ) {
    this.severityLevel = severity === 'error' ? 'error' : 'warning'
    this.message = message
    this.properties = {
      file,
      startLine: line,
      startColumn: column
    }
  }
}
