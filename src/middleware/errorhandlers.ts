export const errorHandler = (err: any, _req: Request, _res: Response): Response => {
    console.error(err);
  
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  };
  