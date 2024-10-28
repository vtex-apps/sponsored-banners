export interface Advertisement {
  adResponseId: string
  imageUrl: string
  targetUrl: string
  bannerImageId: string
  width: number
  height: number
}

interface SponsoredBanner {
  bannerId: string
  advertisement: Advertisement
}

export interface SponsoredBannersData {
  sponsoredBanners: SponsoredBanner[]
}
