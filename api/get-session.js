import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({
      error: "session_id required"
    });
  }

  try {

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"]
    });

    return res.status(200).json(session);

  } catch (err) {

    console.error("get-session error:", err);

    return res.status(500).json({
      error: "Failed to fetch session"
    });
  }
}
