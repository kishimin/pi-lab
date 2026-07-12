import * as z from "zod";
import { piMessageInputSchema } from "../schemas/pi-message";

export type PiMessageInputSchema = z.infer<typeof piMessageInputSchema>;
