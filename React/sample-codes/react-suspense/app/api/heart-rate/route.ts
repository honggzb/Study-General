import wait from "wait";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    label: "Heart Rate",
    value: "120bpm",
    variance: "2%",
    varianceDirection: "down",
    icon: "heart",
  };

  await wait(1000);

  return Response.json({ data });
}