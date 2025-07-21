
const globalErrorHandler = async (err, req, res, next) => {
            const message = err.message || "Something went wrong";
            const statusCode = err.statusCode || 500;

            res.status(statusCode).json({ success: false, message });
}

export default globalErrorHandler;