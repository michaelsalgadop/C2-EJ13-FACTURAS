# Ejercicio - Facturas

Tendrás que programar la interfaz de usuario que tienes maquetada en este HTML, teniendo en cuenta que se alimenta de los datos que le proporciona la API.

- Pide el listado de facturas a la API y guárdalas en una variable. La URL a la que tienes que apuntar es `http://localhost:3001/facturas`
- La tabla tiene cuatro facturas falsas, tómalas como referencia pero no tienen que aparecer en la interfaz final.
- Prepara una fila "dummy" sin datos y aplícale una clase CSS que la oculte. Será la fila "molde" para crear a partir de ella el resto de filas.
- Rellena la tabla a partir de las facturas **de tipo ingreso**, una por fila.
- Las facturas de la API vienen con el porcentaje de IVA. En la columna IVA tendrás que mostrar la cantidad de IVA, que es el porcentaje aplicado a la base imponible (Si la base es 1000€ y el porcentaje de IVA es 21%, entonces la cantidad de IVA es 210€).
- En la columna Total tiene que aparecer la suma de base imponible + cantidad de IVA.
- La columna Estado tiene que tener el fondo verde si la factura está abonada, y roja si no lo está.
- La columna Vence tiene que mostrar:
    · Si está abonada, un guión ("-")
    · Si no está abonada deberá decir la fecha de vencimiento, y:
      - Si la fecha de vencimiento ha pasado, tiene que decir hace cuántos días, y mostrar el fondo rojo.
      - Si la fecha de vencimiento no ha pasado, tiene que decir cuántos días faltan, y mostrar el fondo verde.
- En el pie de la tabla tienen que aparecer los totales: suma de bases imponibles, suma de cantidades de IVA, y suma de totales.
