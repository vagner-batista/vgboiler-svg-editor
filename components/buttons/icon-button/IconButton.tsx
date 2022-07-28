import React from 'react';
import styled, { css } from 'styled-components';
import Caligraphy from '../../../lib/images/icones gceditor/caligraphyIcon.svg';
import Color from '../../../lib/images/icones gceditor/colorIcon.svg';
import Compass from '../../../lib/images/icones gceditor/compassIcon.svg';
import Elipse from '../../../lib/images/icones gceditor/elipseIcon.svg';
import Eraser from '../../../lib/images/icones gceditor/eraserIcon.svg';
import Fill from '../../../lib/images/icones gceditor/fillIcon.svg';
import Freehand from '../../../lib/images/icones gceditor/freehandIcon.svg';
import Gradient from '../../../lib/images/icones gceditor/gradientIcon.svg';
import Move from '../../../lib/images/icones gceditor/moveIcon.svg';
import Nodes from '../../../lib/images/icones gceditor/nodeIcons.svg';
import Path from '../../../lib/images/icones gceditor/pathIcon.svg';
import Polygon from '../../../lib/images/icones gceditor/polygonIcon.svg';
import Rect from '../../../lib/images/icones gceditor/rectIcon.svg';
import Spray from '../../../lib/images/icones gceditor/sparyIcon.svg';
import Text from '../../../lib/images/icones gceditor/textIcon.svg';
import Zoom from '../../../lib/images/icones gceditor/zoomIcon.svg';

export type IdefaultIcons = {
  move: React.ComponentType,
  caligraphy: React.ComponentType,
  color: React.ComponentType,
  compass: React.ComponentType,
  eraser: React.ComponentType,
  fill: React.ComponentType,
  freehand: React.ComponentType,
  gradient: React.ComponentType,
  nodes: React.ComponentType,
  path: React.ComponentType,
  rect: React.ComponentType,
  spray: React.ComponentType,
  text: React.ComponentType,
  zoom: React.ComponentType,
  elipse: React.ComponentType,
  polygon: React.ComponentType
}

const defaultIcons:IdefaultIcons = {
  move: Move,
  caligraphy: Caligraphy,
  color: Color,
  compass: Compass,
  eraser: Eraser,
  fill: Fill,
  freehand: Freehand,
  gradient: Gradient,
  nodes: Nodes,
  path: Path,
  rect: Rect,
  spray: Spray,
  text:Text,
  zoom: Zoom,
  elipse: Elipse,
  polygon: Polygon,
}

const iconsObj = {
  Move,
  Caligraphy,
  Color,
  Compass,
  Eraser,
  Fill,
  Freehand,
  Gradient,
  Nodes,
  Path,
  Rect,
  Spray,
  Text,
  Zoom
}

type IiconStyle = {
  width: string | number,
  height: string | number,
}
const iconStyle = ({width, height}:IiconStyle) => css`
  
  width: ${width };
  height: ${height };
  margin:10px;
  transition: all .15s ease-in-out, scale 1s ease-in-out, width 0s, height 0s;
  filter: drop-shadow(2px 2px 2px rgb(0 0 0 / .4));
  &:hover{
    filter: drop-shadow(1px 1px 1px rgb(0 0 0 / .4));
    transform: scale(.99) translate(1px,1px);
  }
  &:active{
    filter: drop-shadow(1px 1px 3px rgb(0 0 0 / .4)) brightness(115%);
    transform: scale(.985) translate(1px, 1px);
  }
  &&{
    cursor: default;
  }
`

const StyledIcon = styled(({icon, ...rest})=>{const element = (icon in defaultIcons && typeof icon==='string') ? defaultIcons[icon as keyof IdefaultIcons] : icon; return React.createElement(element, rest )})`
  width: ${props => props.size==='small' ? '30px' : '90px'};
  height: ${rest => rest.size==='small' ? '30px' : '90px'};
  ${rest => iconStyle({width:rest.width, height:rest.height})}
`

export interface IIconButton {
  icon: React.ComponentType | string
}



const IconButton: React.FC<IIconButton> = ({ icon }) => {
  
  return (
    <StyledIcon icon={icon || Move} width='30px' height='40px' />
  );
};

export default IconButton;
