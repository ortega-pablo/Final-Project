export const validateNewCat = (input) => {

    let errors = {};
    if (input.name) {
      if (input.name.trim() === "") {
        errors.name = "Se require un nombre";
      } else if (input.name.length < 1) {
        errors.name = "El nombre debe contener mas de una letra";
      } else if (input.name.length > 11) {
        errors.name = "El nombre no puede tener mas de 11 letras";
      } 
    }
    if (input.description) {
        if (input.description.trim() === "") {
          errors.description = "Se require un nombre";
        } else if (input.description.length < 1) {
          errors.description = "La descripción debe contener mas de una letra";
        } else if (input.description.length > 11) {
          errors.description = "La descripción no puede tener mas de 11 letras";
        } 
      }
      console.log(errors)
    return errors
}