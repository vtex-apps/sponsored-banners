import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import { useDevice } from 'vtex.device-detector'
import sponsoredBannersQuery from 'vtex.store-resources/QuerySponsoredBanners'

import messages from '../../messages'
import type {
  SponsoredBannersData,
  SponsoredBannersProps,
} from '../../interfaces'

const SPONSORED_COUNT = 1

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
        sponsoredCount: SPONSORED_COUNT,
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
    spinnerSize: isDesktop ? 40 : 20,
    ratio:
      data && data.sponsoredBanners.length > 0
        ? data.sponsoredBanners[0].advertisement.width /
          data.sponsoredBanners[0].advertisement.height
        : 0,
  }

  return {
    sponsoredBanners: data?.sponsoredBanners ?? [],
    loading,
    error,
    styleProps,
    handleClick,
    imageAlt,
  }
}
