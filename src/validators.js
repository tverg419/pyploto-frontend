class MinLengthPWValidator {
    constructor(length) {
        this.length = length
    }
    validate(input) {
        return input.length >= this.length
    }
    getLength() {
        return this.length
    }
}

class UppercasePWValidator {
    validate(input) {
        return /[A-Z]/.test(input)
    }
}
class NumericPWValidator {
    validate(input) {
        return /[0-9]/.test(input)
    }
}
class SpecialCharacterPWValidator {
    validate(input) {
        return /[!@#$%^&*]/.test(input)
    }
}

export {
    MinLengthPWValidator,
    UppercasePWValidator,
    NumericPWValidator,
    SpecialCharacterPWValidator
}