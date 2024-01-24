import { Helmet } from 'react-helmet-async';

import { MailView } from 'src/sections/mail/view';

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Helmet>
        <title> Mail</title>
      </Helmet>

      <MailView />
    </>
  );
}
