import React from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useDevice } from 'vtex.device-detector'
import { Spinner } from 'vtex.styleguide'
import sponsoredBannersQuery from 'vtex.store-resources/QuerySponsoredBanners'

import type { SponsoredBannersData } from '../../interfaces'
import messages from '../../messages'

export const SponsoredBanner = () => {
  const { formatMessage } = useIntl()
  const { isMobile } = useDevice()
  const { data, loading } = useQuery<SponsoredBannersData>(
    sponsoredBannersQuery,
    {
      variables: {
        channel: isMobile ? 'mobile' : 'website',
      },
    }
  )

  const styleProps = {
    width: isMobile ? '320px' : '1232px',
    height: isMobile ? '50px' : '270px',
    spinnerSize: isMobile ? 20 : 40,
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: styleProps.width,
        height: styleProps.height,
      }}
    >
      {loading ? (
        <Spinner size={styleProps.spinnerSize} />
      ) : (
        data?.sponsoredBanners.map((banner) => (
          <img
            key={banner.bannerId}
            src={banner.advertisement.imageUrl}
            alt={formatMessage(messages.sponsoredBanner)}
            style={{
              width: styleProps.width,
              height: styleProps.height,
            }}
          />
        ))
      )}
    </div>
  )
}
