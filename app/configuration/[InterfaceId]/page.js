import { InterfaceDetailHeader } from "@/components/Configuration/InterfaceDetail/InterfaceDetailHeader";

export default function ConfigDetail({ params }) {
  const { InterfaceId } = params;
  console.log(InterfaceId);

  return (
    <>
      <InterfaceDetailHeader interfaceId={InterfaceId} />
    </>
  );
}
