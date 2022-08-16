import { makeDecorator } from '@storybook/addons';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';



const authMockSession: Session = {
  user: {
    name: "Vagner Rogério Batista",
    email: "vagner-batista@procergs.rs.gov.br",
    image: "/gato.png",
  },
  expires: new Date().toString(),
}


const unauthMockSession = undefined;
const notAllowedMockSession = null;


const withSession = makeDecorator({
  name: 'withSession',
  parameterName: 'session',
  wrapper: (storyFn, context) => {
    // Do something with `parameters`, which are set via { something: ... }

    // Note you may alter the story output if you like. 
    // Although generally that's not advised.

    return <SessionProvider session={context.parameters.session}>{storyFn(context) as React.ReactNode}</SessionProvider>
  }
})

export default withSession;
export {
  unauthMockSession,
  authMockSession,
  notAllowedMockSession
};

