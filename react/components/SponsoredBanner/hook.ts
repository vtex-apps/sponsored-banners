import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import { useDevice } from 'vtex.device-detector'
import sponsoredBannersQuery from 'vtex.store-resources/QuerySponsoredBanners'

import type {
  SponsoredBannersData,
  SponsoredBannersProps,
} from '../../interfaces'
import messages from '../../messages'

export function useSponsoredBanner({
  adUnit,
  placement = 'homepage',
  channel = 'website',
}: SponsoredBannersProps) {
  const { formatMessage } = useIntl()
  const { device } = useDevice()
  const isDesktop = device === 'desktop'

  const { data, loading, error } = useQuery<SponsoredBannersData>(
    sponsoredBannersQuery,
    {
      variables: {
        placement,
        adUnit,
        channel,
      },
    }
  )

  function handleClick(url: string) {
    window.open(url, '_self')
  }

  const imageAlt = formatMessage(messages.sponsoredBanner)

  const styleProps = {
    width: data?.sponsoredBanners?.[0]?.advertisement.width || 0,
    height: data?.sponsoredBanners?.[0]?.advertisement.height || 0,
    ratio: data
      ? data.sponsoredBanners[0].advertisement.width /
        data.sponsoredBanners[0].advertisement.height
      : 0,
    spinnerSize: isDesktop ? 40 : 20,
  }

  return {
    data,
    loading,
    error,
    styleProps,
    handleClick,
    imageAlt,
  }
}
