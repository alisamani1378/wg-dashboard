export const InterfaceDetailPeersCard = ({ peerDetail }) => {
  const { name, id } = peerDetail;

  return (
    <div className="col-span-1 p-4 border border-primaryLight rounded-md flex justify-between">
      {name}
      <span className="text-red-300">{id}</span>
    </div>
  );
};
