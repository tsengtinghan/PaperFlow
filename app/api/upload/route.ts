export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get("file");
  const file1 = formData.get('files[0]');
  const file2 = formData.get('files[1]');
  console.log(file1);
  console.log(file2);
  return new Response(file1, {});
}
