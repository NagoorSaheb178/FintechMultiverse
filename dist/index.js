var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertPersonaSchema: () => insertPersonaSchema,
  insertUserSchema: () => insertUserSchema,
  personas: () => personas,
  users: () => users
});
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var personas = pgTable("personas", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  // Make userId required since we need it
  type: text("type").notNull(),
  selectedAt: text("selected_at").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertPersonaSchema = createInsertSchema(personas).pick({
  userId: true,
  type: true,
  selectedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createPersona(insertPersona) {
    if (!insertPersona.userId) {
      throw new Error("User ID is required to create a persona");
    }
    const existingPersona = await this.getPersonaByUserId(insertPersona.userId);
    if (existingPersona) {
      const [updated] = await db.update(personas).set({
        type: insertPersona.type,
        selectedAt: insertPersona.selectedAt
      }).where(eq(personas.id, existingPersona.id)).returning();
      return updated;
    } else {
      const [persona] = await db.insert(personas).values(insertPersona).returning();
      return persona;
    }
  }
  async getPersonaByUserId(userId) {
    if (!userId) return void 0;
    const [persona] = await db.select().from(personas).where(eq(personas.userId, userId));
    return persona || void 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/init", async (req, res) => {
    try {
      const existingUser = await storage.getUser(1);
      if (!existingUser) {
        const userData = insertUserSchema.parse({
          username: "testuser",
          password: "password123"
        });
        const user = await storage.createUser(userData);
        console.log("Created test user:", user);
        return res.status(201).json({ message: "Database initialized", user });
      }
      return res.status(200).json({ message: "Database already initialized", user: existingUser });
    } catch (error) {
      console.error("Error initializing database:", error);
      res.status(500).json({ message: "Failed to initialize database", error: String(error) });
    }
  });
  app2.post("/api/personas", async (req, res) => {
    try {
      console.log("Received persona data:", req.body);
      const validatedData = insertPersonaSchema.parse({
        userId: 1,
        // Mock user ID since we're not implementing auth
        type: req.body.type,
        selectedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      console.log("Validated persona data:", validatedData);
      const persona = await storage.createPersona(validatedData);
      console.log("Created persona:", persona);
      res.status(201).json(persona);
    } catch (error) {
      console.error("Error saving persona:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid persona data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save persona", error: String(error) });
      }
    }
  });
  app2.get("/api/personas/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const persona = await storage.getPersonaByUserId(userId);
      if (persona) {
        res.status(200).json(persona);
      } else {
        res.status(404).json({ message: "No persona found for this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve persona" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import express2 from "express";
var app = express2();
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 5e3;
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  server.listen(PORT, "127.0.0.1", () => {
    log(`Server successfully started on http://127.0.0.1:${PORT}`);
  }).on("error", (err) => {
    switch (err.code) {
      case "EADDRINUSE":
        log(`ERROR: Port ${PORT} is already in use`);
        break;
      case "EACCES":
        log(`ERROR: Permission denied for port ${PORT}`);
        break;
      case "EADDRNOTAVAIL":
        log(`ERROR: Address 127.0.0.1 not available`);
        break;
      default:
        log(`ERROR: Server failed to start - ${err.message}`);
    }
    process.exit(1);
  }).on("close", () => {
    log("Server shutting down");
  });
})();
