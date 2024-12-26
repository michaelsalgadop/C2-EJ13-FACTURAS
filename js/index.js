import { facturas } from "../datos/facturas.js";
import { DateTime as Fecha, Interval, Duration } from "../plugins/luxon.js";

const fechaActual = Fecha.now();
const cargando = document.querySelector(".loading");
const listado = document.querySelector(".listado tbody");
const elementoTotalBase = document.querySelector(".listado .total-base");
const elementoTotalIva = document.querySelector(".listado .total-iva");
const elementoTotalFacturas = document.querySelector(
  ".listado .total-facturas"
);
console.log(facturas);
const pintarDatosTabla = () => {
  try {
    mostrarOcultarCargando();
    let totalBase = 0;
    let totalIva = 0;
    let totalFacturas = 0;
    for (const {
      numero,
      fecha,
      concepto,
      base,
      tipoIva,
      abonada,
      vencimiento,
    } of facturas) {
      const facturaElemento = document
        .querySelector(".factura-dummy")
        .cloneNode(true);
      facturaElemento.classList.remove("factura-dummy");
      const elementoNumero = facturaElemento.querySelector(".numero");
      elementoNumero.textContent = numero;
      const elementoFecha = facturaElemento.querySelector(".fecha");
      elementoFecha.textContent = traeFechaLocal(fecha);
      const elementoConcepto = facturaElemento.querySelector(".concepto");
      elementoConcepto.textContent = concepto;
      const baseElemento = facturaElemento.querySelector(".base");
      baseElemento.textContent = `${base}€`;
      const ivaElemento = facturaElemento.querySelector(".iva");
      const ivaLineaFactura = traeIvaLineaFactura(base, tipoIva);
      ivaElemento.textContent = `${ivaLineaFactura}€ (${tipoIva}%)`;
      const elementoTotal = facturaElemento.querySelector(".total");
      const totalLineaFactura = base + ivaLineaFactura;
      elementoTotal.textContent = `${
        Number.isInteger(totalLineaFactura)
          ? totalLineaFactura
          : totalLineaFactura.toFixed(2)
      }€`;
      const elementoEstado = facturaElemento.querySelector(".estado");
      elementoEstado.textContent = abonada ? "Abonada" : "Pendiente";
      elementoEstado.classList.add(esEstadoFavorable(abonada));
      const elementoVence = facturaElemento.querySelector(".vence");
      const [fechaVencimientoLocal, noHaPasadoPlazo, dias] =
        traeDatosVencimiento(vencimiento);
      elementoVence.classList.add(
        esEstadoFavorable(abonada || noHaPasadoPlazo)
      );
      elementoVence.textContent = abonada
        ? "-"
        : `${fechaVencimientoLocal} (${
            noHaPasadoPlazo ? "faltan" : "hace"
          } ${dias} días)`;
      listado.appendChild(facturaElemento);
      totalBase += base;
      totalIva += ivaLineaFactura;
      totalFacturas += Number.isInteger(totalLineaFactura)
        ? totalLineaFactura
        : +totalLineaFactura.toFixed(2);
    }
    elementoTotalBase.textContent = `${totalBase.toFixed(2)}€`;
    elementoTotalIva.textContent = `${totalIva.toFixed(2)}€`;
    elementoTotalFacturas.textContent = `${totalFacturas}€`;
    mostrarOcultarCargando();
  } catch (error) {
    console.log(error.message);
  }
};

const mostrarOcultarCargando = () => cargando.classList.toggle("off");
const traeFechaLocal = (timestamp) =>
  Fecha.fromMillis(timestamp).toFormat("dd/MM/yyyy");
const traeIvaLineaFactura = (base, iva) => base * (iva / 100);
const esEstadoFavorable = (estado) =>
  estado ? "table-success" : "table-danger";
const traeDatosVencimiento = (vencimiento) => {
  const fechaVencimiento = Fecha.fromMillis(vencimiento);
  const fechaVencimientoLocal = fechaVencimiento.toFormat("dd/MM/yyyy");
  const noHaPasadoPlazo = fechaActual < fechaVencimiento;
  const fechaInicial = noHaPasadoPlazo ? fechaActual : fechaVencimiento;
  const fechaFinal = (noHaPasadoPlazo ? fechaVencimiento : fechaActual).endOf(
    "day"
  );
  const { days: dias } = Interval.fromDateTimes(fechaInicial, fechaFinal)
    .toDuration("days")
    .toObject();
  return [fechaVencimientoLocal, noHaPasadoPlazo, Math.floor(dias)];
};
pintarDatosTabla();
