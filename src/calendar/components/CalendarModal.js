import { useState, useMemo } from "react";
import { addHours } from "date-fns";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { differenceInSeconds } from "date-fns/esm";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  // modal
  const [isOpen, setIsOpen] = useState(true);
  // Form submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // form
  const [formValues, setFormValues] = useState({
    title: "Pedro",
    notes: "Perez",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // class validation
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  // update inputs
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // update date
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  // close modal
  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Fechas incorrectas, Revisar las fechas ingresadas",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (formValues.title.length <= 0) return;
    console.log(formValues);
  };

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChange(event, "start")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChange(event, "end")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
