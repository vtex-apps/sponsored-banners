type AdUnit = 'billboard'

type Placement = 'homepage'

type Channel = 'website' | 'android' | 'ios' | 'msite' | 'whatsapp'

export interface SponsoredBannersProps {
  adUnit: AdUnit
  placement?: Placement
  channel?: Channel
  showBanner?: boolean
}
