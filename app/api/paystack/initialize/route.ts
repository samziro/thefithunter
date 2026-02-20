export async function POST(req: Request) {
  const { email, amount } = await req.json();

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
      }),
    }
  );

  const data = await response.json();

  return Response.json(data);
}