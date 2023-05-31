import { lazy, useState } from 'react'

import { Grid } from '@mui/material'

import Loadable from 'components/Loadable'

import PagesList from 'components/pages/pagesList'
import { settings } from 'ThemeStyle'
/* import Promo from './Promo'
import PaymentEndDelivery from './PaymentEndDelivery';
import About from './About';
import Contacts from './Contacts';
import Franchise from './Franchise'; */

const Promo = Loadable(lazy(() => import('./Promo')))
const PaymentEndDelivery = Loadable(lazy(() => import('./PaymentEndDelivery')))
const About = Loadable(lazy(() => import('./About')))
const Contacts = Loadable(lazy(() => import('./Contacts')))
const Franchise = Loadable(lazy(() => import('./Franchise')))
const Ads = Loadable(lazy(() => import('./Ads')))

const pages = [
  { title: 'Акции', page: 'Promo' },
  { title: 'Объявления', page: 'Ads' },
/*   { title: 'Оплата и доставка', page: 'PaymentEndDelivery' },
  { title: 'О нас', page: 'About' },
  { title: 'Контакты', page: 'Contacts' },
  { title: 'Франшиза', page: 'Franchise' }, */
]

const Pages: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('Promo')
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <PagesList
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pages={pages}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={9}
        /* sx={{ maxHeight: `${settings.wrapper}vh`, overflowY: 'auto' }} */
      >
        {selectedPage === 'Promo' && <Promo />}
        {selectedPage === 'Ads' && <Ads />}
        {selectedPage === 'PaymentEndDelivery' && <PaymentEndDelivery />}
        {selectedPage === 'About' && <About />}
        {selectedPage === 'Contacts' && <Contacts />}
        {selectedPage === 'Franchise' && <Franchise />}
      </Grid>
    </Grid>
  )
}

export default Pages
