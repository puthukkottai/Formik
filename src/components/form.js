import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MyContext } from "./context";

const validationSchema = Yup.object().shape({
  bookname: Yup.string().required("Required"),
  authorname: Yup.string().required("Required"),
  genre: Yup.string().required("Required"),
  publication: Yup.string().required("Required"),
  copies: Yup.number()
    .typeError("Invalid input: Must be a number")
    .required("Required")
    .positive("Must be a positive number")
    .integer("Must be an integer"),
});

const initialValues = {
  bookname: "",
  authorname: "",
  genre: "",
  publication: "",
  copies: "",
};

const MyForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { data, setData } = useContext(MyContext);

  const onSubmit = (values, { resetForm }) => {
    if (isEdit) {
      const updatedData = [...data];
      updatedData[editIndex] = values;
      setData(updatedData);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setData([...data, values]);
    }
    resetForm();
  };

  const onEdit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
  };

  const onDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div className="book-container">
      <h2 className="center">BOOK DATA</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <div className="card">
            <h2>ADD BOOK DETAILS</h2>
            <Form className="form">
              <label htmlFor="bookname">Book Name:</label>
              <Field name="bookname" />
              <ErrorMessage name="bookname" />
              <label htmlFor="authorname">Author Name:</label>
              <Field name="authorname" />
              <ErrorMessage name="authorname" />
              <label htmlFor="genre">Genre:</label>
              <Field name="genre" />
              <ErrorMessage name="genre" />
              <label htmlFor="publication">Publication:</label>
              <Field name="publication" />
              <ErrorMessage name="publication" />
              <label htmlFor="copies">Copies</label>
              <Field type="number" id="copies" name="copies" />
              <ErrorMessage name="copies" />
              <br />{" "}
              <div className="btndiv">
                <button className="btn btn-primary" type="submit">
                  {isEdit ? "Update" : "Submit"}
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>

      <div className="tb">
        <h3 style={{ textAlign: "center", color: "black" }}>
          VIEW BOOK DETAILS
        </h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Genre</th>
              <th>Publication</th>
              <th>Copies</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.bookname}</td>
                <td>{item.authorname}</td>
                <td>{item.genre}</td>
                <td>{item.publication}</td>
                <td>{item.copies}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => onEdit(index)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyForm;
