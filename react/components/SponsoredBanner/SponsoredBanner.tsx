import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import { useSponsoredBanner } from './hook'
import { getDataProperties } from '../../utils'
import type { SponsoredBannersProps } from '../../interfaces'

import './styles.css'

const CSS_HANDLES = ['bannerWrapper', 'bannerImage'] as const

export const SponsoredBanner = (props: SponsoredBannersProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { data, error, handleClick, loading, styleProps, imageAlt } =
    useSponsoredBanner(props)

  if (
    !!error ||
    !data?.sponsoredBanners ||
    data.sponsoredBanners.length === 0
  ) {
    return null
  }

  const banner = data.sponsoredBanners[0]
  const dataProperties = getDataProperties(banner)

  return (
    <div
      {...dataProperties}
      className={`${handles.bannerWrapper} flex justify-center items-center`}
      style={{
        maxWidth: styleProps.width,
        height: 'auto',
        aspectRatio: `${styleProps.ratio}`,
      }}
    >
      {loading ? (
        <Spinner size={styleProps.spinnerSize} />
      ) : (
        <button
          onClick={() => {
            handleClick(banner.advertisement.targetUrl)
          }}
          style={{
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <img
            className={handles.bannerImage}
            src={banner.advertisement.imageUrl}
            alt={imageAlt}
            style={{
              width: styleProps.width,
              height: 'auto',
              aspectRatio: `${styleProps.ratio}`,
            }}
          />
        </button>
      )}
    </div>
  )
}

SponsoredBanner.defaultProps = {
  adUnit: 'billboard',
  placement: 'homepage',
}

SponsoredBanner.schema = {
  title: 'store/sponsored-banner',
  type: 'object',
  properties: {
    adUnit: {
      type: 'string',
      title: 'admin/editor.ad-unit',
      default: 'billboard',
      enum: ['billboard'],
      enumNames: ['970px x 250px'],
    },
    placement: {
      type: 'string',
      title: 'admin/editor.placement',
      default: 'homepage',
      enum: ['homepage'],
      enumNames: ['admin/editor.placement.homepage'],
    },
  },
}
