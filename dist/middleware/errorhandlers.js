export const errorHandler = (err, _req, _res) => {
    console.error(err);
    return new Response(JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
    }), { status: 500, headers: { "Content-Type": "application/json" } });
};
