import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
// @ts-ignore
import xss from "xss-clean";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Basic Security Middlewares
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://ais-pre-*.run.app", "https://ais-dev-*.run.app", "https://*.google.com"],
        connectSrc: ["'self'", "https://ais-pre-*.run.app", "https://ais-dev-*.run.app", "https://*.google.com", "https://*.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://*.googleusercontent.com", "https://*.picsum.photos", "https://*.google.com", "https://ai.studio"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        frameSrc: ["'self'", "https://*.google.com", "https://*.youtube.com", "https://ai.studio"],
        frameAncestors: ["'self'", "https://*.google.com", "https://ai.studio", "https://*.run.app"],
      },
    },
    frameguard: false, // Disable X-Frame-Options to allow AI Studio iframe
  }));
  
  app.use(cors());
  app.use(express.json({ limit: "10kb" })); // Limit body size to prevent DoS
  app.use(hpp()); // Prevent HTTP Parameter Pollution
  app.use(xss()); // Sanitize user input against XSS

  // 2. Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api", limiter);

  // 3. API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "System secure" });
  });

  // 4. Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Security measures: Helmet, CORS, Rate Limiting, HPP, XSS-Clean, Body Limiting enabled.");
  });
}

startServer();
