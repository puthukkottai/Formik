import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MyContext1 } from "./userContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required"),
  membership: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  membership: "",
  location: "",
};

const UserForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { data, setData } = useContext(MyContext1);

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
      <h2 className="center">ADD USER</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <div className="card">
            <h2>CREATE</h2>
            <Form className="form">
              <label htmlFor="name">User Name:</label>
              <Field name="name" />
              <ErrorMessage name="name" />
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
              <label htmlFor="phone">Phone Number:</label>
              <Field name="phone" />
              <ErrorMessage name="phone" />
              <label htmlFor="membership">Membership type:</label>
              <Field name="membership" />
              <ErrorMessage name="membership" />
              <label htmlFor="location">Location</label>
              <Field type="text" id="location" name="location" />
              <ErrorMessage name="location" />
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
          VIEW USER DETAILS
        </h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Location</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.membership}</td>
                <td>{item.location}</td>
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

export default UserForm;
