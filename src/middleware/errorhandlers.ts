export const errorHandler = (err: any, req: Request, res: Response): Response => {
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
  