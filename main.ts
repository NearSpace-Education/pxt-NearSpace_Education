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
        //% block="LM35"
        LM35,
        //% block="KS0033"
        KS0033
    }

    /**
     * gets the temperure from a set of supported temperture sensors
     */
    //% block="get temperture(°F) from $sensorName on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function getTemp(sensorName: TempSensor, pin: AnalogPin): number {
        const raw = pins.analogReadPin(pin)
        let celsius = 0

        switch (sensorName) {
            case TempSensor.LM35:
                //LM36: 10mV/°C with 500mV offset at 0°C
                //3.3V system with 10-bit ADC
                const voltageLM35 = (raw * 3.3) / 1023
                celsius = (voltageLM35) * 100
                break
            case TempSensor.KS0033:
                //KS0033: NTC thermistor with 10k resistor
                //3.3V system with 10-bit ADC
                const voltageKS0033 = (raw * 3.3) / 1023
                const R = 10000 // 10k pull-up
                const resistance = ((3.3 - voltageKS0033) * R / voltageKS0033)

                // Steinhart-Hart equation parameters //no clue what this is online told me to do it though
                const B = 3950
                const T0 = 298.15 // 25°C in Kelvin
                const R0 = 10000 // resistance at T0

                const kelvin = 1 / ((1 / T0) + (1 / B) * Math.log(resistance / R0))
                celsius = kelvin - 273.15
                break
        }

        const farenheit = (celsius * 1.8) + 32
        return farenheit

    }


    /**
     * gets the relative gas levels (%) from the MQ2 gas sensor
     */
    //% block="get gas on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function getGas(pin: AnalogPin): number {
        const raw = pins.analogReadPin(pin)
        const percentange = (raw/1023) * 100

        return percentange
    }


    /**
     * gets the relative steam levels (%) from the Ks0203 steam sensor
     */
    //% block="get steam on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function getSteam(pin: AnalogPin): number {
        const raw = pins.analogReadPin(pin)
        const percentange = (raw/1023) * 100

        return percentange
    }

    /**
     * gets the moisture from the Ks0049 keyestudio Soil Humidity Sensor
     * 0  ~300     dry soil
     * 300~700     humid soil
     * 700~950     in water
     */
    //% block="get moisture on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline
    export function getMoisture(pin: AnalogPin): number {
        const raw = pins.analogReadPin(pin)
        const percentange = (raw/1023) * 100

        return percentange
    }



    /**
     * toggle an LED on a given pin
     */
    //% block="toggle led $toggle on pin $pin"
    //% weight=90
    //% group="Sensors"
    //% inlineInputMode=inline

    export function toggleLED(toggle: boolean, pin: DigitalPin) {
        pins.digitalWritePin(pin, +toggle)
    }

        

    /** MATH **/
    
    /**
     * Returns the logarithm of a number with a specified base.
     * Returns NaN if base ≤ 0, base = 1, or number ≤ 0.
     * 
     * @param base the base of the logarithm (e.g. 2, 10)
     * @param num the number to take the logarithm of
     */
    //% block="log base $base of $num"
    //% color="#8f2929"
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
    //% color="#8f2929"
    //% weight=80
    //% inlineInputMode=inline
    export function ln(num: number): number {
        if (num <= 0) {
            return NaN
        }
        return Math.log(num)
    }
}

