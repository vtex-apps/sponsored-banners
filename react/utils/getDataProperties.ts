import type { DataProperties, SponsoredBanner } from '../interfaces'

export function getDataProperties(banner: SponsoredBanner): DataProperties {
  const { adResponseId, advertisement } = banner
  const { bannerImageId } = advertisement

  return {
    'data-van-aid': bannerImageId,
    'data-van-banner-imageid': bannerImageId,
    'data-van-res-id': adResponseId,
  }
}
