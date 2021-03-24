export let testobject = {
    id: 1,
    name: "my object",
    propertya: 1234,
    propertyb: "someprop again"
}

export const testClass = class testClass {
    constructor(
        value = ""
    ) {
        this.someFunct(value);
    }

    someFunct(val) {
        this.value = val + " some text";
    }
}