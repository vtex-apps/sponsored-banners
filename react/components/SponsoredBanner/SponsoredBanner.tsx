import React from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useDevice } from 'vtex.device-detector'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import sponsoredBannersQuery from 'vtex.store-resources/QuerySponsoredBanners'

import type { SponsoredBannersData } from '../../interfaces'
import messages from '../../messages'

import './styles.css'

const CSS_HANDLES = ['bannerWrapper', 'bannerButton', 'bannerImage'] as const

export const SponsoredBanner = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { formatMessage } = useIntl()
  const { device } = useDevice()
  const isDesktop = device === 'desktop'

  const { data, loading } = useQuery<SponsoredBannersData>(
    sponsoredBannersQuery,
    {
      variables: {
        placement: 'homepage',
        adUnit: isDesktop ? 'billboard' : 'smartphone-banner',
        channel: isDesktop ? 'website' : 'mobile',
      },
    }
  )

  const styleProps = {
    width: isDesktop ? '1232px' : '320px',
    height: isDesktop ? '270px' : '50px',
    spinnerSize: isDesktop ? 40 : 20,
  }

  function handleClick(url: string) {
    window.open(url, '_self')
  }

  return (
    <div
      className={`${handles.bannerWrapper} flex justify-center items-center`}
      style={{
        width: styleProps.width,
        height: styleProps.height,
      }}
    >
      {loading ? (
        <Spinner size={styleProps.spinnerSize} />
      ) : (
        data?.sponsoredBanners.map((banner) => (
          <button
            className={handles.bannerButton}
            key={banner.bannerId}
            onClick={() => {
              handleClick(banner.advertisement.targetUrl)
            }}
          >
            <img
              className={handles.bannerImage}
              src={banner.advertisement.imageUrl}
              alt={formatMessage(messages.sponsoredBanner)}
              style={{
                width: styleProps.width,
                height: styleProps.height,
              }}
            />
          </button>
        ))
      )}
    </div>
  )
}
