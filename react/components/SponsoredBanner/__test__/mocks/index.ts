import type {
  SponsoredBannersData,
  SponsoredBannersProps,
} from '../../../../interfaces'

export const mockSponsoredBannersData: SponsoredBannersData = {
  sponsoredBanners: [
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
  ],
}

export const props: SponsoredBannersProps = {
  adUnit: 'billboard',
  placement: 'homepage',
  channel: 'android',
}
