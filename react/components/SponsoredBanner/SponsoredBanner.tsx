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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: isMobile ? '320px' : '1232px',
        height: isMobile ? '50px' : '270px',
      }}
    >
      {loading ? (
        <Spinner size={isMobile ? 20 : 40} />
      ) : (
        data?.sponsoredBanners.map((banner) => (
          <img
            key={banner.bannerId}
            src={banner.advertisement.imageUrl}
            alt={formatMessage(messages.sponsoredBanner)}
            style={{
              width: '100%',
            }}
          />
        ))
      )}
    </div>
  )
}
