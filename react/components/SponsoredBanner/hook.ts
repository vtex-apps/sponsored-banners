import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import { useDevice } from 'vtex.device-detector'
import sponsoredBannersQuery from 'vtex.store-resources/QuerySponsoredBanners'

import type { SponsoredBannersData } from '../../interfaces'
import messages from '../../messages'

export function useSponsoredBanner() {
  const { formatMessage } = useIntl()
  const { device } = useDevice()
  const isDesktop = device === 'desktop'

  const { data, loading, error } = useQuery<SponsoredBannersData>(
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

  const imageAlt = formatMessage(messages.sponsoredBanner)

  return {
    data,
    loading,
    error,
    styleProps,
    handleClick,
    imageAlt,
  }
}
