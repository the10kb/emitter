import {Emitter} from "../src";

describe("emitter/simple cases", () => {

    it("should emit object", (done)=>{
        let emitter = new Emitter<{message : string}>();

        emitter.on((t)=>{
            expect(t.message).toBe("test");
            done();
        });

        emitter.emit({message : "test"});
    });

    it("should emit string", (done)=>{
        let emitter = new Emitter<string>();

        emitter.on((t)=>{
            expect(t).toBe("test");
            done();
        });

        emitter.emit("test");
    });

    it("should emit number", (done)=>{
        let emitter = new Emitter<number>();

        emitter.on((t)=>{
            expect(t).toBe(42);
            done();
        });

        emitter.emit(42);
    });

    it("should emit with specified context", (done)=>{
        let emitter = new Emitter<number>();

        emitter.on(function(t){
            expect(this.m).toBe("test");
            expect(t).toBe(42);
            done();
        }, {m : "test"});

        emitter.emit(42);
    });

    it("should off all", ()=>{
        let emitter = new Emitter<number>();

        emitter
            .on(function(t){
                throw new Error()
            }, {m : "test"})
            .on(function(t){
                throw new Error()
            }, {m : "test"});

        emitter.off();
        emitter.emit(42);
    });

    it("should off specified", ()=>{
        let emitter = new Emitter<number>();

        let c = function(t){
            throw new Error()
        };
        emitter
            .on(c)
            .on(function(t){
                c = t;
            });

        emitter.off(c);
        emitter.emit(42);

        expect(c).toBe(42);
    });

    it("should off specified by context", ()=>{
        let emitter = new Emitter<number>();

        let c = function(t){
            if( this.name == 43 ){
                throw new Error()
            } else {
                c = t;
            }
        };
        
        let ctx = {name : 43};
        emitter
            .on(c)
            .on(c, ctx);

        emitter.off(ctx);
        emitter.emit(42);

        expect(c).toBe(42);
    });
});
