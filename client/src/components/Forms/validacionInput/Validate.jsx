export const validate = (input) => {

    let errors = {};
    if (input.name) {
      if (input.name.trim() === "") {
        errors.name = "Se require un nombre";
      } else if (input.name.length < 1) {
        errors.name = "El nombre debe contener mas de una letra";
      } else if (input.name.length > 11) {
        errors.name = "El nombre no puede tener mas de 11 letras";
      } else if (input.name === 33) {
        errors.name = "El nombre no puede ser repetido";
      }
    };
    if (input.brand) {
      if (input.brand.trim() === "") {
        errors.brand = "Se require la marca";
      } else if (input.brand.length < 1) {
        errors.brand = "La marca debe contener mas de una letra";
      } else if (input.brand.length > 11) {
        errors.brand = "La marca no puede tener mas de 11 letras";
      }
    };
    if (input.price) {
      if (input.price.trim() === "") {
        errors.price = "Se requiere el precio del producto";
      } else if (isNaN(input.price)) {
        errors.price = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
      } else if (input.price < 0) {
        errors.price = "El valor no puede ser negativo";
      }
    };
    if (input.sku) {
      if (input.sku.trim() === "") {
        errors.sku = "Se requiere el codigo SKU del producto";
      }
    };
    if (input.description) {
      if (input.description.trim() === "") {
        errors.description = "Se requiere la descripción del producto";
      } else if (input.description.length > 10) {
        errors.description = "La descripción no puede contener mas de 500 caracteres";
      }
    };
    if (input.netWeight) {
      if (input.netWeight.trim() === "") {
        errors.netWeight = "Se requiere el peso neto del producto";
      } else if (isNaN(input.netWeight)) {
        errors.netWeight = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
      } else if (input.netWeight < 0) {
        errors.netWeight = "El valor no puede ser negativo";
      }
    };
    if (input.grossWeight) {
      if (input.grossWeight.trim() === "") {
        errors.grossWeight = "Se requiere el peso bruto del producto";
      } else if (isNaN(input.grossWeight)) {
        errors.grossWeight = "El valor debe ser numerico"; // ojo, , debemos aceptar puntos
      } else if (input.grossWeight < 0) {
        errors.grossWeight = "El valor no puede ser negativo";
      }
    };
    if (input.warranty) {
      if (input.warranty.trim() === "") {
        errors.warranty = "Se requiere la garantia del producto";
      } else if (input.warranty.length > 8) {
        errors.warranty = "La descripción de la garantia no puede contener mas de 500 caracteres";
      }
    }
    console.log(errors)
  
    return errors
  }
  