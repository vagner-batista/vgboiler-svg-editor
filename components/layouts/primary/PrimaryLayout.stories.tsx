import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrimaryLayout, { IPrimaryLayout } from './PrimaryLayout';
import { mockPrimaryLayoutProps } from './PrimaryLayout.mocks';

export default {
    title: 'Layouts/PrimaryLayout',
    component: PrimaryLayout,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof PrimaryLayout>;

const Template:ComponentStory<typeof PrimaryLayout> = (args) => (
    <PrimaryLayout {...args} />
)

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
    ...mockPrimaryLayoutProps.base,
  } as IPrimaryLayout;