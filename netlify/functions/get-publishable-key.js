exports.handler = async function () {
  const key = process.env.STRIPE_PUBLISHABLE_KEY || "";

  if (!key) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Publishable key not configured." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ key }),
  };
};
