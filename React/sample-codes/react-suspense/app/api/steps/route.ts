import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Steps walked",
    value: "5,742",
    variance: "1%",
    varianceDirection: "up",
    icon: "shoe",
  };

  await wait(2700);

  // return Response.json({ data });
  return Response.json({ data: null });
}