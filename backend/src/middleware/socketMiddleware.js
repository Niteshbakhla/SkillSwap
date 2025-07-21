import jwt from "jsonwebtoken";
import cookie from "cookie";
import config from "../config/config.js";
import asyncHandler from "./asyncHandler.js";

export const socketMiddleware = asyncHandler
            (
                        async (socket, next) => {
                                    const cookies = socket.handshake.headers?.cookie;
                                    if (!cookies) {
                                                socket.userId = null;
                                                return next();
                                    }

                                    const parseCookies = cookie.parse(cookies);
                                    const token = parseCookies?.token;

                                    if (!token) {
                                                socket.userId = null;
                                                return next();
                                    }

                                    const decoded = jwt.verify(token, config.JWT_SECRET);
                                    socket.userId = decoded;
                                    next();
                        }
            )