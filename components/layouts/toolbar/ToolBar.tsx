import IconButton from 'components/buttons/icon-button/IconButton';
import React, { useState } from 'react';
import styled from 'styled-components';
//import { Icons as Iconos } from '../../../lib/images/icones gceditor';
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

export interface IToolBar {
  open: boolean;
  children?: React.ComponentType;
}

const Icons = {
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
  text: Text,
  zoom: Zoom,
  elipse: Elipse,
  polygon: Polygon,
};

const SideBar = styled(({ open, ...rest }) => <div {...rest} />)`
  bottom: 0;
  background-color: #ddd;
  border-right: solid #bbb 2px;
  display: flex;
  flex-direction: column;
  position: relative;
  left: ${({ open }) => (open ? '0px' : '-60px')};
  align-items: center;
  transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:after {
    content: '${({ open }) => (open ? '<<' : '>>')}';
    position: absolute;
    left: 100%;
    width: 30px;
    background-color: #ddd;
    top: 30px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    padding-top: 10px;
    border-top-right-radius: 20%;
    border-bottom-right-radius: 20%;
    border: 2px solid #bbb;
    border-left: none;
  }
`;

const ToolBar: React.FC<IToolBar> = ({ open = false, children }) => {
  const [isOpen, setOpen] = useState(open);

  const toggleVisibility = (e: MouseEvent) => {
    if (e.target === e.currentTarget) setOpen(!isOpen);
  };

  return (
    <SideBar onClick={(e: MouseEvent) => toggleVisibility(e)} open={isOpen}>
      {Object.keys(Icons).map((icon, index) => (
        <IconButton icon={icon} key={index} />
      ))}

      {children}
    </SideBar>
  );
};

export default ToolBar;
