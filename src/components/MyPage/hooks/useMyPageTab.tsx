import { useState } from 'react';

export type MyPageTabType = 'activity' | 'creator';

export const useMyPageTab = (initialTab: MyPageTabType) => {
  const [activeTab, setActiveTab] = useState<MyPageTabType>(initialTab);

  const isActivityTab = activeTab === 'activity';
  const isCreatorTab = activeTab === 'creator';

  return {
    activeTab,
    setActiveTab,
    isActivityTab,
    isCreatorTab,
  };
};
