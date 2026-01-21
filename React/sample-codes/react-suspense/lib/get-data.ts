"use server";

const getData = async (route: string) => {
  const host =
    process.env.NODE_ENV === "production"
      ? `https://suspense-six.vercel.app`
      : process.env.APP_HOST;

  const res = await fetch(`${host}/api/${route}`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return res?.data;
};

export default getData;