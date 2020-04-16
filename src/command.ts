import * as command from '@actions/core/lib/command'
import {Annotation} from './annotation'

export const commandProperties = (
  annotation: Annotation
): {[key: string]: string} => {
  return {
    line: `${annotation.line}`,
    col: `${annotation.column}`,
    file: annotation.path
  }
}

export async function echoMessages(annotations: Annotation[]): Promise<void> {
  for (const annotation of annotations) {
    command.issueCommand(
      annotation.level,
      commandProperties(annotation),
      annotation.message
    )
  }
}
