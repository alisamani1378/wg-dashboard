import { InterfaceDetailHeader } from "@/components/Configuration/InterfaceDetail/InterfaceDetailHeader";

export default function ConfigDetail({ params }) {
  const { InterfaceId } = params;

  return (
    <>
      <InterfaceDetailHeader interfaceId={InterfaceId} />
    </>
  );
}
