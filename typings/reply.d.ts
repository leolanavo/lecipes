import type { FastifyReply } from 'fastify';

export type Reply = FastifyReply & {
	view(page: string, model: Record<string, any>);
};