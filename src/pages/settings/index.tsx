import Grid from '@mui/material/Grid'
import { FC, lazy } from 'react'

import Loadable from 'components/Loadable'
const ProductTypes = Loadable(
  lazy(() => import('components/settings/productTypes'))
)

const Settings: FC = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ProductTypes />
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
    </div>
  )
}

export default Settings
