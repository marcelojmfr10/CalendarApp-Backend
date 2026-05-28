/*
rutas de eventos
host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

// obtener eventos

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");

// todas tienen que pasar por la validación del jwt, y si una ruta tiene que ser pública se coloca antes que esta línea
router.use(validarJWT);

// segundo argumento middlewares
router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento,
);

router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento,
);
router.delete("/:id", eliminarEvento);

module.exports = router;
