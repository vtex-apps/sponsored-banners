import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@vtex/test-tools/react'

import { SponsoredBanner } from '../SponsoredBanner'

jest.mock('../useSponsoredBanner', () => ({
  useSponsoredBanner: jest.fn().mockReturnValue({
    sponsoredBanners: [],
    loading: false,
    error: null,
    styleProps: {
      spinnerSize: 40,
      ratio: 3,
    },
    imageAlt: 'Alt da imagem',
  }),
}))

describe('SponsoredBanner component', () => {
  it('renders the loading spinner when loading is true', () => {
    const { getByTestId } = render(<SponsoredBanner />)
    const spinner = getByTestId('loading-spinner')

    expect(spinner).toBeInTheDocument()
  })

  it('renders the error message when error is not null', () => {
    const errorMessage = 'An error occurred'
    const { getByText } = render(<SponsoredBanner />)
    const errorText = getByText(errorMessage)

    expect(errorText).toBeInTheDocument()
  })

  it('renders the sponsored banners when there are banners available', () => {
    const sponsoredBanners = [
      { id: 1, imageUrl: 'banner1.jpg' },
      { id: 2, imageUrl: 'banner2.jpg' },
    ]

    const { getByAltText } = render(<SponsoredBanner />)

    sponsoredBanners.forEach((banner) => {
      const image = getByAltText(banner.imageUrl)

      expect(image).toBeInTheDocument()
    })
  })
})
