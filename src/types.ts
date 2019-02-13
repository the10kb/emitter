export type Callback<T> = (o : T, ...args) => void;

export type InternalEmitterHandler<T> = {
    cb   ?: Callback<T>;
    ctx  ?: any;
    once ?: boolean;
}
