import { ValidationError } from "./errors";
import type express from "express";

export type Request =
  | express.Request
  | express.Request<{ [k: string]: string | string[] }>;

export type Response<T = unknown> = express.Response<
  any,
  { error?: ValidationError; initialValues: T }
>;
