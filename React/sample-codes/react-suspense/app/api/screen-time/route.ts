import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Screen time",
    value: "1.6 hours",
    variance: "7%",
    varianceDirection: "down",
    icon: "phone",
  };

  await wait(1500);

  return Response.json({ data });
}