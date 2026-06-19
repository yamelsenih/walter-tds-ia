// Pausa inicial para que el mensaje de bienvenida sea visible
// basic.pause(5000)
// Configuración Bluetooth al iniciar
bluetooth.onBluetoothConnected(function () {
    // Muestra "sí" cuando está conectado
    basic.showIcon(IconNames.Yes)
})
let TMT = 0
let TM = 0
// bluetoothEnabled = false
// bluetooth.onBluetoothDisconnected(function () {
// // Muestra "no" cuando está desconectado
// basic.showIcon(IconNames.No)
// })
// El valor de jsonData no se usa en el código original, lo mantengo pero si no lo necesitas, puedes borrarlo.
let jsonData = ""
let TDS = 11
// Habilita el servicio de UART
bluetooth.startUartService()
basic.forever(function () {
    // 1. Lectura del sensor TDS
    TDS = pins.analogReadPin(AnalogReadWritePin.P1)
    TM = 20000
    TMT = 40000
    // Pequeña pausa para estabilizar la lectura analógica
    basic.pause(200)
    basic.showNumber(TDS)
    // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
    // Esto es crucial para no saturar el búfer UART.
    bluetooth.uartWriteString("" + TDS)
    // 3. Evaluación de datos y actualización del LCD/periféricos
    // Solo procesa si la lectura no es cero (asumiendo que 0 es un valor inválido)
    if (TDS >= 1 && TDS <= 240) {
        basic.showIcon(IconNames.Heart)
        wuKong.setMotorSpeed(wuKong.MotorList.M1, 100)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(TM)
        wuKong.stopMotor(wuKong.MotorList.M1)
        // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
        // Esto es crucial para no saturar el búfer UART.
        bluetooth.uartWriteString("" + TDS)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(2000)
        pins.digitalWritePin(DigitalPin.P14, 1)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(TM)
        pins.digitalWritePin(DigitalPin.P14, 0)
        // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
        // Esto es crucial para no saturar el búfer UART.
        bluetooth.uartWriteString("" + TDS)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(2000)
    } else if (TDS >= 241) {
        // Ajuste el límite a 351 para evitar solapamiento con el anterior
        basic.showIcon(IconNames.Sad)
        wuKong.setMotorSpeed(wuKong.MotorList.M2, 100)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(TM)
        wuKong.stopMotor(wuKong.MotorList.M2)
        // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
        // Esto es crucial para no saturar el búfer UART.
        bluetooth.uartWriteString("" + TDS)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(5000)
        pins.digitalWritePin(DigitalPin.P13, 1)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(TM)
        pins.digitalWritePin(DigitalPin.P13, 0)
        // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
        // Esto es crucial para no saturar el búfer UART.
        bluetooth.uartWriteString("" + TDS)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(5000)
        pins.digitalWritePin(DigitalPin.P14, 1)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(TM)
        pins.digitalWritePin(DigitalPin.P14, 0)
        // 2. Envío de datos por Bluetooth (solo una vez por ciclo, después de la lectura)
        // Esto es crucial para no saturar el búfer UART.
        bluetooth.uartWriteString("" + TDS)
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(5000)
        // Sonido de alerta
        for (let index = 0; index < 4; index++) {
            music.playTone(523, music.beat(BeatFraction.Half))
            music.playTone(659, music.beat(BeatFraction.Half))
        }
        // Pequeña pausa entre acciones de sonido y servo
        basic.pause(100)
    }
    bluetooth.uartWriteString("" + TDS)
    // Pausa principal antes de la siguiente lectura para dar tiempo al sistema
    basic.pause(4000)
    bluetooth.uartWriteString("" + TDS)
    basic.pause(100)
})
