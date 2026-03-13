const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    console.log("🟡 Received event body:", event.body);

    const { items, origin, shipping } = JSON.parse(event.body);
    console.log("🟢 Parsed items:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("❌ No items in cart:", items);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No items in cart" }),
      };
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || item.name || "Poster",
          metadata: { poster_id: item.id ? String(item.id) : "" },
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
    }));

    console.log("🧾 Line items for Stripe:", line_items);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        client_note: shipping ? JSON.stringify(shipping) : "",
      },
    });

    console.log("✅ Stripe session created:", session.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (err) {
    console.error("🔥 create-checkout error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
