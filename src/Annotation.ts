import {AnnotationSeverityLevel} from './AnnotationSeverityLevel'

export class Annotation {
  severityLevel: AnnotationSeverityLevel

  constructor(
    severity: string,
    public message: string,
    public file: string,
    public line: number,
    public column: number,
  ) {
    this.severityLevel = severity === 'error' ? 'error' : 'warning'
  }
}
