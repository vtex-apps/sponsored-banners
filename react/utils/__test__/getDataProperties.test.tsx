import { getDataProperties } from '../getDataProperties'

describe('getDataProperties', () => {
  const response = getDataProperties({
    adResponseId: '123',
    advertisement: {
      bannerImageId: '1',
      imageUrl: 'www.image.com.br',
      targetUrl: 'www.target.com.br',
      width: 970,
      height: 250,
    },
  })

  it('should return the correct data properties', () => {
    expect(response).toEqual({
      'data-van-aid': '1',
      'data-van-banner-imageid': '1',
      'data-van-res-id': '123',
    })
  })
})
