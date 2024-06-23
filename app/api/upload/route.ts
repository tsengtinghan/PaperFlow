export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  console.log("hello", formData);
  const file = formData.get("files");
  
  console.log(file);
  return new Response(file, {});
}
