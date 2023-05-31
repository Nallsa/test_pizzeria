import styled from 'styled-components'
import { settings, shadows } from 'ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  border-radius: ${settings.blockBorderRadius};
  padding: 1.625rem 1.625rem;
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`
