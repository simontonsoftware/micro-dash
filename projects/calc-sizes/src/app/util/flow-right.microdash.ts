import { flowRight } from 'micro-dash';

const increment = (x: number) => x + 1;
flowRight((flowRight as any)(), increment)(1);
