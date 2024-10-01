import { Interfaces } from "./Interfaces";
import { MainSectionTopHeader } from "./MainSectionTopHeader";

export const MainSection = () => {
  return (
    <div className="flex-1 p-4 pt-10 overflow-y-auto">
      <MainSectionTopHeader />
      <Interfaces />
    </div>
  );
};
