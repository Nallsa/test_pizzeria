import {FC, useState, useRef, useEffect} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useSelector } from 'react-redux';
import { RootState } from 'dataStore/state';
import { useActions } from 'hooks/useActions';



interface IProps {
	setState: Function
}

const PizzeriaFilter: FC<IProps> = ({setState}) => {
	const { pizzerias } = useSelector((state: RootState) => state.pizzerias)
	const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [options, setOptions] = useState([{ id: 0, value: 'Все пиццерии' }])

	const { getAllPizzerias } = useActions()
	useEffect(() => {
		if (pizzerias?.length == 0) {
			getAllPizzerias()
		}
		setOptions( [ {id: 0, value: 'Все пиццерии'}, ...pizzerias?.map(el=> ({id: el.id!, value: `${el?.address?.city}, ${el?.address?.street}`}))])
	}, [pizzerias])

  /* const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].id}`);
  }; */

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
	) => {
    setSelectedIndex(index!);
		setOpen(false);
		if (index === 0) {
			setState((prev: any)=> ({...prev, pizzeria_id: null}))
		} else {
			setState((prev: any)=> ({...prev, pizzeria_id: index}))
		}
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
	return (
		<>
			<ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" sx={{marginBottom: 3}}>
        <Button onClick={handleToggle}>{options?.find(el=> el?.id === selectedIndex)?.value}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      /* disabled={index === 2} */
                      selected={option.id === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, option.id!)}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
		</>
	)
}

export default PizzeriaFilter