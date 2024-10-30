import React from 'react'
import { render } from '@vtex/test-tools/react'

import { SponsoredBanner } from '../SponsoredBanner'

test('greets Fred', () => {
  const { queryByText } = render(<SponsoredBanner />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
})
