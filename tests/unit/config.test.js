import { describe, it, expect } from 'vitest'
import { siteConfig } from '../../src/config.js'

describe('siteConfig', () => {
  it('defines required metadata fields', () => {
    expect(siteConfig.githubUsername).toBeTruthy()
    expect(siteConfig.siteTitle).toContain('Prince Peñaflor')
    expect(siteConfig.siteDescription.length).toBeGreaterThan(20)
  })
})
