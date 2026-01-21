import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Calories",
    value: "1,812",
    variance: "5%",
    varianceDirection: "up",
    icon: "pulse",
  };

  await wait(700);

  return Response.json({ data });
}