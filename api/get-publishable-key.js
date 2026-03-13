export default async function handler(req, res) {
  const key = process.env.STRIPE_PUBLISHABLE_KEY || "";

  if (!key) {
    return res.status(500).json({
      error: "Publishable key not configured.",
    });
  }

  return res.status(200).json({ key });
}