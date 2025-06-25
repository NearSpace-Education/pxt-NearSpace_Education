/**
 * main file which provides simplifed ui for students
 */

//% color="#1274bd"
namespace NSE {

    /**SENSORS**/

    //PRIVATE

    //PUBLIC - blocks which get exported and used by students

    /**
     * This should be placed in the start up section
     */
    //% block="start with number $integer"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function start(integer: number) {


    }

    //% color="#8f2929"
    /**
     * Returns the logarithm of a number with a specified base.
     * Returns NaN if base ≤ 0, base = 1, or number ≤ 0.
     * 
     * @param base the base of the logarithm (e.g. 2, 10)
     * @param num the number to take the logarithm of
     */
    //% block="log base $base of $num"
    //% weight=80
    //% group="Math"
    //% inlineInputMode=inline
    export function logarithm(base: number, num: number): number {
        if (base <= 0 || base == 1 || num <= 0) {o0
            return NaN
        }
        return Math.log(num) / Math.log(base)
    }

    /**
     * Returns the natural logarithm of a number
     * Returns NaN if number ≤ 0.
     * @param num the number to take the logarithm of
     */
    //% block="ln $num"
    //% group="Math"
    //% weight=80
    //% inlineInputMode=inline
    export function ln(num: number): number {
        if (num <= 0) {
            return NaN
        }
        return Math.log(num)
    }
}

