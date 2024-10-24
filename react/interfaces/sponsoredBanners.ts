interface Advertisement {
  actionCost: number
  adRequestId: string
  adResponseId: string
  campaignId: string
  imageUrl: string
}
interface SponsoredBanner {
  bannerId: string
  advertisement: Advertisement
}
export interface SponsoredBannersData {
  sponsoredBanners: SponsoredBanner[]
}
