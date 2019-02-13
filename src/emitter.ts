import {Callback, InternalEmitterHandler} from "./types";

export class Emitter<T = any> {
    private handlers : InternalEmitterHandler<T>[] = [];

    emit(object : T, ...args) : this {

        this.handlers.forEach((h)=>{
            h.cb.call(h.ctx, object, ...args);
        });

        this.handlers = this.handlers.filter((h)=>!h.once);

        return this;
    }

    on(cb : Callback<T>, ctx?:any) : this{
        this.handlers.push({ cb, ctx : ctx || window });
        return this;
    }

    once(cb : Callback<T>, ctx?:any) : this {
        this.handlers.push({ cb, ctx : ctx || window, once : true });
        return this;
    }

    off(cb ?: Callback<T>, ctx ?: any) : this{
        if( cb && ctx ) {
            this.handlers = this.handlers.filter((h)=>h.ctx!=ctx && h.cb!=cb);
        } else if(cb && !ctx){
            this.handlers = this.handlers.filter((h)=>h.cb!=cb);
        } else if( !cb && ctx){
            this.handlers = this.handlers.filter((h)=>h.ctx!=ctx);
        } else {
            this.handlers = [];
        }
        return this;
    }

    get empty(){
        return this.handlers.length == 0;
    }
}
