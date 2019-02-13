export type Callback<T> = (o?: T, ...args: any[]) => void;

export interface InternalEmitterHandler<T> {
    cb   ?: Callback<T>;
    ctx  ?: any;
    once ?: boolean;
}
