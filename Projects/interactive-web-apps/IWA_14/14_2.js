function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function internal() {
    const added = this.add(this.internal.a, this.internal.b);
    const multiplied = this.multiply(this.internal.b, this.internal.c);
    console.log(added);
    console.log(multiplied);
    return this;
  }
  
  // Not allowed to change below this
  
  const example1 = {
    internal: {
      a: 2,
      b: 4,
      c: 8,
    },
    add,
    multiply,
    calculate: internal,
  };
  
  const example2 = {
    internal: {
      a: 2,
      b: 2,
      c: 3,
    },
    add,
    multiply,
    calculate: internal,
  };
  
  example1.calculate.call(example1);
  example2.calculate.call(example2);
  