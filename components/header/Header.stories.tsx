import { ComponentMeta, ComponentStory } from '@storybook/react';
import withSession, {
  authMockSession,
  notAllowedMockSession,
  unauthMockSession,
} from '../../.storybook/decorators/SessionDecorator';
import Header from './Header';
import { mockHeaderProps } from './Header.mocks';

export default {
  title: 'Layouts/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: { ...mockHeaderProps.base },
  decorators: [withSession],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Auth = Template.bind({});
Auth.parameters = { session: authMockSession };

export const Unauth = Template.bind({});
Unauth.parameters = { session: unauthMockSession };

export const Error = Template.bind({});
Unauth.parameters = { session: notAllowedMockSession };
