import { once } from '../../lib/function';

// $ExpectType (this: unknown, _a1: number, _a2: string) => Date
once((_a1: number, _a2: string) => new Date());
// $ExpectType (this: [], _a1: number) => void
once(function (this: [], _a1: number): void {});
