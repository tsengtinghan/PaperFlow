export default async function PackagePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div>{params.id}</div>;
}
