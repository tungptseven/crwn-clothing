import React from 'react'
import { Route } from 'react-router'

import CollectionsOverview from '../../components/collection-overview/collection-overview.component'

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <CollectionsOverview />
    {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
  </div>
)

export default ShopPage