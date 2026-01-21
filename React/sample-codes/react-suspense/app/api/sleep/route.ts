import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Hours slept",
    value: "8.19",
    variance: "5%",
    varianceDirection: "down",
    icon: "timer",
  };

  await wait(1700);

  return Response.json({ data });
  // return Response.json({ data: null });
}