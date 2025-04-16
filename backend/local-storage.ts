import { User, InsertUser, Persona, InsertPersona, users, personas } from '../database/schema';
import { eq } from 'drizzle-orm';
import { db } from './db';

export class DatabaseStorage {
  private dbInstance: any;

  constructor(dbInstance: any) {
    this.dbInstance = dbInstance;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await this.dbInstance.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.dbInstance.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.dbInstance
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPersona(insertPersona: InsertPersona): Promise<Persona> {
    const [persona] = await this.dbInstance
      .insert(personas)
      .values(insertPersona)
      .returning();
    return persona;
  }

  async getPersonaByUserId(userId: number | null | undefined): Promise<Persona | undefined> {
    if (!userId) return undefined;
    const [persona] = await this.dbInstance.select().from(personas).where(eq(personas.userId, userId));
    return persona || undefined;
  }
}