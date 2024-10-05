import { InterfaceDetailPeersCard } from "./InterfaceDetailPeersCard";

export const InterfaceDetailPeers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <InterfaceDetailPeersCard />
      <InterfaceDetailPeersCard />
      <InterfaceDetailPeersCard />
      <InterfaceDetailPeersCard />
      <InterfaceDetailPeersCard />
      <InterfaceDetailPeersCard />
    </div>
  );
};
