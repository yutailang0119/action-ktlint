import * as core from '@actions/core'
import * as xml2js from 'xml2js'
import {Annotation} from './Annotation'

export const parseXml = async (reportXml: string): Promise<Annotation[]> => {
  const parser = new xml2js.Parser()
  const xml = await parser.parseStringPromise(reportXml)
  return new Promise(resolve => {
    try {
      const annotations: Annotation[] = []
      for (const fileElement of xml.checkstyle.file) {
        const file = fileElement.$

        for (const errorElement of fileElement.error) {
          const error = errorElement.$

          const annotation = new Annotation(
            error.severity,
            error.message,
            file.name,
            parseInt(error.line),
            parseInt(error.column)
          )
          annotations.push(annotation)
        }
      }
      resolve(annotations)
    } catch (error) {
      core.debug(`failed to read ${error}`)
    }
  })
}
