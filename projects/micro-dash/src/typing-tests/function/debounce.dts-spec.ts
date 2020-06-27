import { debounce } from '../../lib/function';

// $ExpectType ((_s: string, _n: number) => void) & { cancel(): void; }
debounce((_s: string, _n: number) => 'hi');
