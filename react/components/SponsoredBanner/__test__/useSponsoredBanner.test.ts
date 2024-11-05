import { useQuery } from 'react-apollo'
import { renderHook } from '@vtex/test-tools/react'
import { useDevice } from 'vtex.device-detector'

import { mockData, mockProps } from './mocks'
import { useSponsoredBanner } from '../useSponsoredBanner'

jest.mock('react-apollo', () => ({
  useQuery: jest.fn(),
}))

jest.mock('react-intl', () => ({
  defineMessages: jest.fn().mockImplementation(() => ({
    sponsoredBanner: 'sponsoredBanner',
  })),
  useIntl: jest.fn().mockReturnValue({
    formatMessage: jest.fn().mockImplementation((text) => text),
  }),
}))

jest.mock('vtex.device-detector', () => ({
  useDevice: jest.fn(),
}))

describe('useSponsoredBanner hook', () => {
  describe('when it has data without error', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: mockData,
        loading: false,
        error: null,
      })
      ;(useDevice as jest.Mock).mockReturnValue({ device: 'desktop' })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 3.88,
      })

      expect(result.current.sponsoredBanners).toEqual([
        {
          adResponseId: '123',
          advertisement: {
            bannerImageId: '1',
            imageUrl: 'www.image.com.br',
            targetUrl: 'www.target.com.br',
            width: 970,
            height: 250,
          },
        },
      ])
    })

    it('should return correct values for mobile', () => {
      ;(useDevice as jest.Mock).mockReturnValueOnce({ device: 'mobile' })

      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.styleProps).toEqual({
        spinnerSize: 20,
        ratio: 3.88,
      })
    })
  })

  describe('when it has error', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: false,
        error: 'error',
      })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('error')
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 0,
      })

      expect(result.current.sponsoredBanners).toEqual([])
    })
  })

  describe('when it has no data', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: false,
        error: null,
      })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 0,
      })

      expect(result.current.sponsoredBanners).toEqual([])
    })
  })

  describe('when it has no data in the array', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: { sponsoredBanners: [] },
        loading: false,
        error: null,
      })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 0,
      })

      expect(result.current.sponsoredBanners).toEqual([])
    })
  })

  describe('when loading is true and it has no data', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: null,
        loading: true,
        error: null,
      })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBeNull()
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 0,
      })

      expect(result.current.sponsoredBanners).toEqual([])
    })
  })

  describe('when loading is true and it has ]] data', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: mockData,
        loading: true,
        error: null,
      })
    })

    it('should return correct values', () => {
      const { result } = renderHook(() => useSponsoredBanner(mockProps))

      expect(result.current.loading).toBe(true)
      expect(result.current.error).toBeNull()
      expect(result.current.imageAlt).toBe('sponsoredBanner')

      expect(result.current.styleProps).toEqual({
        spinnerSize: 40,
        ratio: 3.88,
      })

      expect(result.current.sponsoredBanners).toEqual([
        {
          adResponseId: '123',
          advertisement: {
            bannerImageId: '1',
            imageUrl: 'www.image.com.br',
            targetUrl: 'www.target.com.br',
            width: 970,
            height: 250,
          },
        },
      ])
    })
  })
})
