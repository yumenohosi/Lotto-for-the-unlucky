import React, { Suspense } from 'react';
import UnluckyLottoGenerator from '@/components/UnluckyLottoGenerator';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnluckyLottoGenerator />
    </Suspense>
  );
};

export default Page;
