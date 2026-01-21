import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Glucose level",
    value: "70 mg/dL",
    variance: "1%",
    varianceDirection: "down",
    icon: "glucose",
  };

  await wait(2200);

  return Response.json({ data });
}