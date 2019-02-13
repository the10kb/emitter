import {Emitter} from "../src";

describe("emitter/simple cases", () => {

    it("should emit object", (done) => {
        const emitter = new Emitter<{message: string}>();

        emitter.on((t) => {
            expect(t.message).toBe("test");
            done();
        });

        emitter.emit({message : "test"});
    });

    it("should emit string", (done) => {
        const emitter = new Emitter<string>();

        emitter.on((t) => {
            expect(t).toBe("test");
            done();
        });

        emitter.emit("test");
    });

    it("should emit number", (done) => {
        const emitter = new Emitter<number>();

        emitter.on((t) => {
            expect(t).toBe(42);
            done();
        });

        emitter.emit(42);
    });

    it("should emit with specified context", (done) => {
        const emitter = new Emitter<number>();

        emitter.on(function(t) {
            expect(this.m).toBe("test");
            expect(t).toBe(42);
            done();
        }, {m : "test"});

        emitter.emit(42);
    });

    it("should emit several parameters", (done) => {
        const emitter = new Emitter<number>();

        emitter.on((t1, t2, t3) => {
            expect(t1).toBe(42);
            expect(t2).toBe(43);
            expect(t3).toBe(44);
            done();
        });

        emitter.emit(42, 43, 44);
    });

    it("should off all", () => {
        const emitter = new Emitter<number>();

        emitter
            .on(function(t) {
                throw new Error();
            }, {m : "test"})
            .on(function(t) {
                throw new Error();
            }, {m : "test"});

        emitter.off();
        emitter.emit(42);
    });

    it("should off specified", () => {
        const emitter = new Emitter<number>();

        let c = function(t) {
            throw new Error();
        };
        emitter
            .on(c)
            .on(function(t) {
                c = t;
            });

        emitter.off(c);
        emitter.emit(42);

        expect(c).toBe(42);
    });

    it("should off specified by context", () => {
        const emitter = new Emitter<number>();

        let c = function(t) {
            if ( this.name == 43 ) {
                throw new Error();
            } else {
                c = t;
            }
        };

        const ctx = {name : 43};
        emitter
            .on(c)
            .on(c, ctx);

        emitter.off(null, ctx);
        emitter.emit(42);

        expect(c).toBe(42);
    });

    it("should once", (done) => {
        const emitter = new Emitter<number>();

        emitter
            .once((t) => {
                if (t == 43) {
                    throw new Error();
                } else {
                    done();
                }
            });

        emitter.emit(42);
        emitter.emit(43);
    });
});
