import { publicProcedure } from '~/trpc';
import z, { EnumLike } from 'zod';

const iban = new RegExp(
  '/^(?:((?:IT|SM)d{2}[A-Z]{1}d{22})|(NLd{2}[A-Z]{4}d{10})|(LVd{2}[A-Z]{4}d{13})|((?:BG|GB|IE)d{2}[A-Z]{4}d{14})|(GId{2}[A-Z]{4}d{15})|(ROd{2}[A-Z]{4}d{16})|(MTd{2}[A-Z]{4}d{23})|(NOd{13})|((?:DK|FI)d{16})|((?:SI)d{17})|((?:AT|EE|LU|LT)d{18})|((?:HR|LI|CH)d{19})|((?:DE|VA)d{20})|((?:AD|CZ|ES|MD|SK|SE)d{22})|(PTd{23})|((?:IS)d{24})|((?:BE)d{14})|((?:FR|MC|GR)d{25})|((?:PL|HU|CY)d{26}))$',
  'gm',
);

export const accountSchema = z.object({
  account_number: z.string().ulid().describe('Account number - must be an string, validated as ULID'),
  account_name: z.string().min(1).describe('Account name - must be a string'),
  iban: z.string({ message: 'IBAN is invalid!' }).regex(iban).describe('IBAN - must be a valid IBAN string'),
  address: z.string().min(3).describe('Address - type string'),
  amount: z.number().describe('Amount - type number'),
  type: z.enum(['sending', 'receiving']).describe('Type - enum (sending, receiving)'),
});

export const listOutboundSchema = accountSchema.array();

export const listInboundSchema = z.object({
  limit: z.number().min(5).max(100),
});
