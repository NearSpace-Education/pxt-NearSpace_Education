/**
 * main file which provides simplifed ui for students
 */

//% color="#1274bd"
namespace NSE {

    /**SENSORS**/

    //PRIVATE

    //PUBLIC - blocks which get exported and used by students

    /**
     * 2 flavors of tempurture sensor
     */
    export enum TempSensor {
        //% block="LM36"
        LM36,
        //% block="KS0033"
        KS0033
    }

    /**
     * This should be placed in the start up section
     */
    //% block="get temperture(°F) from $ on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function getTemp(sensorName: TempSensor, pin: AnalogPin): number {
        const raw = pins.analogReadPin(pin)
        let celsius = 0

        switch (sensorName) {
            case TempSensor.LM36:
                //LM36: 10mV/°C with 500mV offset at 0°C
                //3.3V system with 10-bit ADC
                const voltageLM35 = (raw * 3.3) / 1023
                celsius = (voltageLM35 - 0.5) * 100
                break
            case TempSensor.KS0033:
                //KS0033
                //3.3V system with 10-bit ADC
                const voltageKS0035 = (raw * 3.3) / 1023
                const resistance = (3.3 - voltageKS0035) * 4700 / voltageKS0035
                const kelvin = 1 / (Math.log(resistance/ 10000)) / 3950 + ( 1 / 298.15) //no clue why this is
                celsius = kelvin - 273.15
                break
        }

        const farenheit = (celsius * 1.8) + 32
        return farenheit

    }

    /** MATH **/

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
        if (base <= 0 || base == 1 || num <= 0) {
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

