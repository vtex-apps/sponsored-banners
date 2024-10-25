import type { Advertisement, DataProperties } from '../interfaces'

export function getDataProperties(ad: Advertisement): DataProperties {
  const { bannerImageId, adResponseId } = ad

  return {
    'data-van-aid': bannerImageId,
    'data-van-banner-imageid': bannerImageId,
    'data-van-res-id': adResponseId,
  }
}
