import type express from "express"

export type Request = express.Request | express.Request<{ [k: string]: string | string[] }>
