import { ComponentMeta, ComponentStory } from '@storybook/react';
import FabGroup, { IFabGroup } from './FabGroup';
import { mockFabGroupProps } from './FabGroup.mocks';

export default {
  title: 'Buttons/FabGroup',
  component: FabGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FabGroup>;

const Template: ComponentStory<typeof FabGroup> = (args) => (
  <FabGroup {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFabGroupProps.base,
} as IFabGroup;
