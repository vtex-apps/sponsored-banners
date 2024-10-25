import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import './styles.css'
import { useSponsoredBanner } from './hook'
import { getDataProperties } from '../../utils'

const CSS_HANDLES = ['bannerWrapper', 'bannerImage'] as const

export const SponsoredBanner = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { data, error, handleClick, loading, styleProps, imageAlt } =
    useSponsoredBanner()

  if (
    !!error ||
    !data?.sponsoredBanners ||
    data.sponsoredBanners.length === 0
  ) {
    return null
  }

  const banner = data.sponsoredBanners[0]
  const dataProperties = getDataProperties(banner.advertisement)

  return (
    <div
      {...dataProperties}
      className={`${handles.bannerWrapper} flex justify-center items-center`}
      style={{
        width: styleProps.width,
        height: styleProps.height,
      }}
    >
      {loading ? (
        <Spinner size={styleProps.spinnerSize} />
      ) : (
        <button
          key={banner.bannerId}
          onClick={() => {
            handleClick(banner.advertisement.targetUrl)
          }}
          style={{
            padding: 0,
            border: 'none',
            background: 'none',
          }}
        >
          <img
            className={handles.bannerImage}
            src={banner.advertisement.imageUrl}
            alt={imageAlt}
            style={{
              width: styleProps.width,
              height: styleProps.height,
            }}
          />
        </button>
      )}
    </div>
  )
}
