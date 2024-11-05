import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@vtex/test-tools/react'

import { SponsoredBanner } from '../SponsoredBanner'
import { useSponsoredBanner } from '../useSponsoredBanner'
import { mockSponsoredBannersData } from './mocks/sponsoredBanner'

jest.mock('../useSponsoredBanner', () => ({
  useSponsoredBanner: jest.fn(),
}))

describe('SponsoredBanner component', () => {
  describe('when there are banners available', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: mockSponsoredBannersData.sponsoredBanners,
        imageAlt: 'Alt da imagem',
        loading: false,
        error: null,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('renders the sponsored banners image', () => {
      const { getByAltText, getByTestId } = render(<SponsoredBanner />)
      const banner = getByTestId('banner')
      const image = getByAltText('Alt da imagem')

      expect(banner).toBeInTheDocument()
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'www.image.com.br')
    })

    it('render href correctly', () => {
      const { getByAltText } = render(<SponsoredBanner />)
      const image = getByAltText('Alt da imagem')

      expect(image.parentElement).toHaveAttribute('href', 'www.target.com.br')
    })

    it('render width and ratio correctly correctly', () => {
      const { getByTestId, getByAltText } = render(<SponsoredBanner />)

      const banner = getByTestId('banner')
      const image = getByAltText('Alt da imagem')

      expect(banner.style.maxWidth).toBe('970px')
      expect(banner.style.aspectRatio).toBe('3')
      expect(image.style.width).toBe('970px')
      expect(image.style.aspectRatio).toBe('3')
    })

    it('render data analytics correctly', () => {
      const { getByTestId } = render(<SponsoredBanner />)
      const banner = getByTestId('banner')

      expect(banner).toHaveAttribute('data-van-aid', '1')
      expect(banner).toHaveAttribute('data-van-banner-imageid', '1')
      expect(banner).toHaveAttribute('data-van-res-id', '123')
    })
  })

  describe('when loading is true', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: mockSponsoredBannersData.sponsoredBanners,
        imageAlt: 'Alt da imagem',
        loading: true,
        error: null,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('render the banner, but does not render the image', () => {
      const { queryByAltText, queryByTestId } = render(<SponsoredBanner />)
      const banner = queryByTestId('banner')
      const image = queryByAltText('Alt da imagem')

      expect(banner).toBeTruthy()
      expect(image).toBeNull()
    })
  })

  describe('when showBanner prop is false', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: mockSponsoredBannersData.sponsoredBanners,
        imageAlt: 'Alt da imagem',
        loading: false,
        error: null,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('does not render the banner', () => {
      const { queryByAltText, queryByTestId } = render(
        <SponsoredBanner showBanner={false} />
      )

      const banner = queryByTestId('banner')
      const image = queryByAltText('Alt da imagem')

      expect(banner).toBeNull()
      expect(image).toBeNull()
    })
  })

  describe('when it has any error', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: mockSponsoredBannersData.sponsoredBanners,
        imageAlt: 'Alt da imagem',
        loading: false,
        error: true,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('does not render the banner', () => {
      const { queryByAltText, queryByTestId } = render(<SponsoredBanner />)
      const banner = queryByTestId('banner')
      const image = queryByAltText('Alt da imagem')

      expect(banner).toBeNull()
      expect(image).toBeNull()
    })
  })

  describe('when sponsored banners is null', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: null,
        imageAlt: 'Alt da imagem',
        loading: false,
        error: null,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('does not render the banner', () => {
      const { queryByAltText, queryByTestId } = render(<SponsoredBanner />)
      const banner = queryByTestId('banner')
      const image = queryByAltText('Alt da imagem')

      expect(banner).toBeNull()
      expect(image).toBeNull()
    })
  })

  describe('when sponsored banner is empty array', () => {
    beforeEach(() => {
      ;(useSponsoredBanner as jest.Mock).mockReturnValue({
        sponsoredBanners: [],
        imageAlt: 'Alt da imagem',
        loading: false,
        error: null,
        styleProps: {
          spinnerSize: 40,
          ratio: 3,
        },
      })
    })

    it('does not render the banner', () => {
      const { queryByAltText, queryByTestId } = render(<SponsoredBanner />)
      const banner = queryByTestId('banner')
      const image = queryByAltText('Alt da imagem')

      expect(banner).toBeNull()
      expect(image).toBeNull()
    })
  })
})
