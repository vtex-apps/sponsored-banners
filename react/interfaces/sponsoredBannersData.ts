interface Advertisement {
  bannerImageId: string
  imageUrl: string
  targetUrl: string
  width: number
  height: number
}

export interface SponsoredBanner {
  adResponseId: string
  advertisement: Advertisement
}

export interface SponsoredBannersData {
  sponsoredBanners: SponsoredBanner[]
}
