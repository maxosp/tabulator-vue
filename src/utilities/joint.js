export default function joint(a) {
    let C;
    const b = a[(a.length - 1)];
    a.pop();

    if (a.length > 1) {
        C = joint(a);
    } else {
        [C] = a;
    }

    return function joined(...args) {
        b.apply(new C(...args), args);
    }
}