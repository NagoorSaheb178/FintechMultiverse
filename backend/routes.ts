import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPersonaSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the database with a test user (only needed for development)
  app.get("/api/init", async (req, res) => {
    try {
      // Create a test user with ID 1 if it doesn't exist
      const existingUser = await storage.getUser(1);
      
      if (!existingUser) {
        const userData = insertUserSchema.parse({
          username: "testuser",
          password: "password123",
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
  
  // API route to save the selected persona
  app.post("/api/personas", async (req, res) => {
    try {
      console.log("Received persona data:", req.body);
      const validatedData = insertPersonaSchema.parse({
        userId: 1, // Mock user ID since we're not implementing auth
        type: req.body.type,
        selectedAt: new Date().toISOString(),
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

  // API route to get a user's selected persona
  app.get("/api/personas/:userId", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
