import { ComponentMeta, ComponentStory } from '@storybook/react';
import Fab, { IFab } from './Fab';
import { mockFabProps } from './Fab.mocks';

export default {
  title: 'Buttons/Fab',
  component: Fab,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Fab>;

const Template: ComponentStory<typeof Fab> = (args) => (
  <Fab {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFabProps.base,
} as IFab;
