export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("file");
  const data = await file.arrayBuffer();
  console.log(data);
  return new Response(data, {});
}
