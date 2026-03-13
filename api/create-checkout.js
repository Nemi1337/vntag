import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {

    console.log("🟡 Received event body:", req.body);

    const { items, origin, shipping } = req.body;

    console.log("🟢 Parsed items:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("❌ No items in cart:", items);

      return res.status(400).json({
        error: "No items in cart"
      });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || item.name || "Poster",
          metadata: {
            poster_id: item.id ? String(item.id) : ""
          }
        },
        unit_amount: Math.round((item.price || 0) * 100)
      },
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1
    }));

    console.log("🧾 Line items for Stripe:", line_items);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        client_note: shipping ? JSON.stringify(shipping) : ""
      }
    });

    console.log("✅ Stripe session created:", session.id);

    return res.status(200).json({
      sessionId: session.id
    });

  } catch (err) {

    console.error("🔥 create-checkout error:", err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
