export default function ConfigDetail({ params }) {
  const { configId } = params;
  console.log(configId);

  return (
    <>
      <div>hi{configId}</div>
    </>
  );
}
