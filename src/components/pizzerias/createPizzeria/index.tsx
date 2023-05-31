import { FC, lazy, SyntheticEvent, useEffect, useState } from 'react'

import { Wrapper } from './Styles.elements'
import { IPizzeria } from '../../../dto/pizzerias.dto'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



// import AddressData from './components/AddressData';
// import OwnerAndContacts from './components/OwnerAndContacts';
// import MapAndMetrica from './components/MapAndMetrica';
// import PaymentSettings from './components/PaymentSettings';
// import AccountingSystem from './components/AccountingSystem';
// import Delivery from './components/Delivery';

import { useActions } from 'hooks/useActions';
import Loadable from 'components/Loadable';


const Delivery = Loadable(
  lazy(() => import('./components/Delivery'))
)
const AccountingSystem = Loadable(
  lazy(() => import('./components/AccountingSystem'))
)
const PaymentSettings = Loadable(
  lazy(() => import('./components/PaymentSettings'))
)
const MapAndMetrica = Loadable(
  lazy(() => import('./components/MapAndMetrica'))
)
const OwnerAndContacts = Loadable(
  lazy(() => import('./components/OwnerAndContacts'))
)
const AddressData = Loadable(
  lazy(() => import('./components/AddressData'))
)


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
			style={{width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface IProps {
  showForm: () => void
  editData: IPizzeria | null
}

export const newPizzeriaStateObj: IPizzeria = {
  id: null,
  ownerId: null,
  name: null,
  map: null,
  address: {
    city: null,
    cityId: null,
    street: null,
    streetId: null,
    house: null,
    housing: null,
    description: null,
    floor: null,
  },
  contacts: [],
  delivery_description: null,
  orderMail: null,
  payment_method: null,
  api_login: null,
  api_password: null,
  secret_key: null,
  accounting_secret_key: null,
  accounting_key_affiliate: null,
  min_order_price: null,
  delivery_price: null,
  delivery_area: null,
  is_active: true,
  addressId: null,
  adminsIds: null,
  time_open: null,
	time_close: null,
	yandex_metrica: null,
	yandex_counter: null,
}

const CreatePizzeria: FC<IProps> = ({ showForm, editData }) => {
	console.log({editData})
  const [pizzeriaState, setPizzeriaState] =
		useState<IPizzeria>(newPizzeriaStateObj)
	const [tabValue, setTabValue] = useState(0);

	const { createPizzeria, editPizzeriaById } = useActions()

	const handleSave = (): void => {
    if (editData) {
      editPizzeriaById(pizzeriaState).then(() => {
        handleCancel()
      })
    } else {
      createPizzeria(pizzeriaState).then(() => {
        handleCancel()
      })
    }
	}

	const handleCancel = (): void => {
    setPizzeriaState(newPizzeriaStateObj)
    showForm()
  }

	const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

	useEffect(() => {
		if (editData) {
			setPizzeriaState(editData)
		}
	},[])

	return (
		<>
			<Wrapper>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={tabValue}
					onChange={handleChange}
					aria-label="VerticalTabs"
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					<Tab label="Адрес пиццерии" {...a11yProps(0)} />
					<Tab label="Владелец и контакты" {...a11yProps(1)} />
					<Tab label="Метрика и карта" {...a11yProps(2)} />
					<Tab label="Платёжная система" {...a11yProps(3)} />
					<Tab label="Система учёта" {...a11yProps(4)} />
					<Tab label="Зоны доставки" {...a11yProps(5)} />
				</Tabs>
				<TabPanel value={tabValue} index={0}>
					<AddressData state={pizzeriaState} setState={setPizzeriaState} handleSave={handleSave} handleCancel={handleCancel} />
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<OwnerAndContacts state={pizzeriaState} setState={setPizzeriaState} handleSave={handleSave} handleCancel={handleCancel} />
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
					<MapAndMetrica state={pizzeriaState} setState={setPizzeriaState} handleSave={handleSave} handleCancel={handleCancel} />
				</TabPanel>
				<TabPanel value={tabValue} index={3}>
					<PaymentSettings state={pizzeriaState} setState={setPizzeriaState} handleSave={handleSave} handleCancel={handleCancel} />
				</TabPanel>
				<TabPanel value={tabValue} index={4}>
					<AccountingSystem state={pizzeriaState} setState={setPizzeriaState} handleSave={handleSave} handleCancel={handleCancel} />
				</TabPanel>
				<TabPanel value={tabValue} index={5}>
					<Delivery state={pizzeriaState} handleCancel={handleCancel} />
				</TabPanel>
			</Wrapper>
				{/* <PizzeriaData
					showForm={showForm}
					editData={editData}
					newPizzeria={pizzeriaState}
					setNewPizzeria={setPizzeriaState}
				/>
				<DeliveryAreaSettings />
				<DeliveryArea state={pizzeriaState} setState={setPizzeriaState} /> */}
		</>
  )
}

export default CreatePizzeria
