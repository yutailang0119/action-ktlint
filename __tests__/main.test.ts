import { jest } from '@jest/globals'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('@actions/core', () => core)

const { run } = await import('../src/main.js')

// shows how the runner will run a javascript action with env / stdout protocol
describe('main.ts', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  beforeEach(() => {
    core.getBooleanInput.mockImplementation((name) => {
      switch (name) {
        case 'follow-symbolic-links':
          return true
        case 'ignore-warnings':
          return false
        default:
          return false
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('runs', async () => {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'report-path':
          return path.join(__dirname, 'resource', '*.xml')
        default:
          return ''
      }
    })

    await run()
    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'ktlint with 1 error')
  })

  it('runs without error', async () => {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'report-path':
          return path.join(__dirname, 'resource', 'empty-results.xml')
        default:
          return ''
      }
    })

    await run()

    expect(core.setFailed).not.toHaveBeenCalled()
  })
})
