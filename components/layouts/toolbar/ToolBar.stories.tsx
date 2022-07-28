import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToolBar, { IToolBar } from './ToolBar';
import { mockToolBarProps } from './ToolBar.mocks';

export default {
  title: 'Layouts/ToolBar',
  component: ToolBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ToolBar>;

const Template: ComponentStory<typeof ToolBar> = (args) => (
  <ToolBar {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockToolBarProps.base,
} as IToolBar;
