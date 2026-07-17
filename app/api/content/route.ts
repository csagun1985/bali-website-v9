import { getSiteUser } from "../../chatgpt-auth";
import { getSiteEnv } from "../../platform-env";

const schema = `CREATE TABLE IF NOT EXISTS site_content (id INTEGER PRIMARY KEY CHECK (id = 1), content TEXT NOT NULL, updated_by TEXT, updated_at TEXT NOT NULL)`;
export async function GET(){ const {DB}=getSiteEnv(); await DB.prepare(schema).run(); const row = await DB.prepare("SELECT content FROM site_content WHERE id = 1").first<{content:string}>(); return Response.json({content:row?JSON.parse(row.content):null}); }
export async function PUT(request:Request){ const user=await getSiteUser(); const {DB}=getSiteEnv(); await DB.prepare(schema).run(); const body=await request.json() as {content:unknown}; const content=JSON.stringify(body.content); if(content.length>100000)return new Response("Content too large",{status:413}); await DB.prepare("INSERT INTO site_content (id,content,updated_by,updated_at) VALUES (1,?,?,?) ON CONFLICT(id) DO UPDATE SET content=excluded.content,updated_by=excluded.updated_by,updated_at=excluded.updated_at").bind(content,user.email,new Date().toISOString()).run(); return Response.json({ok:true}); }
