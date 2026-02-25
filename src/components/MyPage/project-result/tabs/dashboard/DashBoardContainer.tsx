import type { ReactNode } from "react";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[1232px] flex flex-col gap-6">
      {children}
    </div>
  );
};

export default DashboardContainer