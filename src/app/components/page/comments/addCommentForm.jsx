import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    const handleUserChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    console.log("users", users);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers = users.map(({ _id, name }) => ({
        name,
        value: _id
    }));
    console.log("ar", arrayOfUsers);

    return (
        <>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    defaultOption="Выберите пользователя"
                    onChange={handleUserChange}
                    options={arrayOfUsers}
                    value={data.userId}
                    name="userId"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleUserChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                ></TextAreaField>
                <div className="col-mb-4 d-flex justify-content-end">
                    <button className="btn btn-primary ml-auto">
                        Опубликовать
                    </button>
                </div>
            </form>
        </>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
